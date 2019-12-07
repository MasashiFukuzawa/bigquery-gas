// Your GCP information
var projectId = '<YOUR GCP PROJECT NUMBER>';
var datasetId = 'data_lake';
// Spreadsheet
var ss = SpreadsheetApp.openById('<YOUR SPREADSHEET ID>');

function execQueryAccordingToDate() {
  const ws = ss.getSheetByName('demo');

  const mysqlTable = setMysqlTable();
  const query      = setQuery(mysqlTable);

  const request = {
    query: query,
    useLegacySql: false
  };

  execBigQuery(ws, request, 'mysql_' + mysqlTable);
};

function setMysqlTable() {
  const today = new Date();
  const day   = today.getDate();

  var mysqlTable;
  if (day < 11) {
    mysqlTable = 'users';
  } else if (day > 20) {
    mysqlTable = 'shops';
  } else {
    mysqlTable = 'comments';
  }
  return mysqlTable;
}

function setQuery(mysqlTable) {
  // Read MySQL data directly from BigQuery by using CloudSQL Federation Query.
  const query =
    "SELECT * FROM EXTERNAL_QUERY( \
      'mycurryapp.asia-northeast1.cloudsql-mycurryapp', \
      'SELECT * FROM " + mysqlTable + "' \
    );"
  return query;
}

function execBigQuery(ws, request, tableId) {
  const queryResults = BigQuery.Jobs.query(request, projectId);
  const jobId = queryResults.jobReference.jobId;

  queryResults = checkOnQueryJobStatus(queryResults, jobId);

  const rows = getAllResults(queryResults, jobId);

  const data = outputToSpreadsheet(rows, ws, queryResults);

  loadDataToBigQuery(data, tableId);
}

// Check on status of the Query Job.
function checkOnQueryJobStatus(queryResults, jobId) {
  const sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }
  return queryResults;
}

// Get all the rows of results.
function getAllResults(queryResults, jobId) {
  const rows = queryResults.rows;
  while (queryResults.pageToken) {
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
      pageToken: queryResults.pageToken
    });
    rows = rows.concat(queryResults.rows);
  }
  return rows;
}

// Clear sheet data and output BigQuery results to sheet.
function outputToSpreadsheet(rows, ws, queryResults) {
  if (rows) {
    ws.clear();

    // Append the headers and return header cols.
    const headers = appendHeader(ws, queryResults);

    // Append the results and return all spreadsheet data.
    const data = appendResults(rows, headers);

    ws.getRange(2, 1, rows.length, headers.length).setValues(data);

    return data;
  } else {
    Logger.log('No rows returned.');
  }
}

function loadDataToBigQuery(data, tableId) {
  if (!targetTableExists(tableId)) {
    createTable(tableId);
  }

  insertData(convertArrayToBlob(data), tableId);
}

function appendHeader(ws, queryResults) {
  const headers = queryResults.schema.fields.map(function(field) {
    return field.name;
  });
  ws.appendRow(headers);
  return headers;
}

function appendResults(rows, headers) {
  const data = new Array(rows.length);
  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].f;
    data[i] = new Array(cols.length);
    for (var j = 0; j < cols.length; j++) {
      data[i][j] = cols[j].v;
    }
  }
  return data;
}

function targetTableExists(tableId) {
  const tableInfo = BigQuery.Tables.list(projectId, datasetId);

  if (tableInfo.totalItems === 0) {
    return false;
  }

  const tables = tableInfo.tables.map(function(table){
    return table.tableReference.tableId;
  });

  if (tables.indexOf(tableId) !== -1) {
    return true;
  } else {
    return false;
  }
}

function createTable(tableId) {
  const table = {
    tableReference: {
      projectId: projectId,
      datasetId: datasetId,
      tableId: tableId
    },
    schema: {
      fields: setBigQuerySchema(tableId)
    }
  };
  table = BigQuery.Tables.insert(table, projectId, datasetId);
  Logger.log('Table created: %s', table.id);
}

function convertArrayToBlob(values) {
  const contentType   = "text/csv";
  const lineDelimiter = ",";

  var csvStr = '';

  // Prepare array to csv format with underscoreGS module.
  underscoreGS._map(
    values,
    function(row){
      csvStr += row.join(lineDelimiter) + '\n';
    }
  )

  // Get blob data and return.
  return Utilities.newBlob(csvStr, contentType);
}

function insertData(blob, tableId) {
  const job = {
    configuration: {
      load: {
        destinationTable: {
          projectId: projectId,
          datasetId: datasetId,
          tableId: tableId
        },
        skipLeadingRows: 0,
        allowJaggedRows: true,
        allowQuotedNewlines: true,
        writeDisposition: 'WRITE_TRUNCATE' // update the target table
      }
    }
  };
  BigQuery.Jobs.insert(job, projectId, blob);
}

function setBigQuerySchema(tableId) {
  var bq_schema;
  switch (tableId) {
    case 'mysql_users':
      bq_schema = [
        {"name": "id", "type": "INTEGER", "mode": "NULLABLE"},
        {"name": "email", "type": "STRING", "mode": "NULLABLE"},
        {"name": "encrypted_password", "type": "STRING", "mode": "NULLABLE"},
        {"name": "reset_password_token", "type": "STRING", "mode": "NULLABLE"},
        {"name": "reset_password_sent_at", "type": "DATETIME", "mode": "NULLABLE"},
        {"name": "remember_created_at", "type": "DATETIME", "mode": "NULLABLE"},
        {"name": "created_at", "type": "DATETIME", "mode": "NULLABLE"},
        {"name": "updated_at", "type": "DATETIME", "mode": "NULLABLE"},
        {"name": "name", "type": "STRING", "mode": "NULLABLE"},
        {"name": "provider", "type": "STRING", "mode": "NULLABLE"},
        {"name": "uid", "type": "STRING", "mode": "NULLABLE"},
        {"name": "twitter_image", "type": "STRING", "mode": "NULLABLE"},
        {"name": "location", "type": "STRING", "mode": "NULLABLE"},
        {"name": "description", "type": "STRING", "mode": "NULLABLE"},
        {"name": "image_data", "type": "STRING", "mode": "NULLABLE"},
        {"name": "comments_count", "type": "INTEGER", "mode": "NULLABLE"},
        {"name": "likes_count", "type": "INTEGER", "mode": "NULLABLE"},
        {"name": "admin_flg", "type": "INTEGER", "mode": "NULLABLE"}
      ];
      break;
    case 'mysql_comments':
      bq_schema = [
        {"name": "id", "type": "INTEGER", "mode": "NULLABLE"},
        {"name": "body", "type": "STRING", "mode": "NULLABLE"},
        {"name": "image_data", "type": "STRING", "mode": "NULLABLE"},
        {"name": "user_id", "type": "INTEGER", "mode": "NULLABLE"},
        {"name": "shop_id", "type": "INTEGER", "mode": "NULLABLE"},
        {"name": "created_at", "type": "DATETIME", "mode": "NULLABLE"},
        {"name": "updated_at", "type": "DATETIME", "mode": "NULLABLE"}
      ]
      break;
    case 'mysql_shops':
      bq_schema = [
        {"name": "id", "type": "INTEGER", "mode": "NULLABLE"},
        {"name": "name", "type": "STRING", "mode": "NULLABLE"},
        {"name": "phone", "type": "STRING", "mode": "NULLABLE"},
        {"name": "image_data", "type": "STRING", "mode": "NULLABLE"},
        {"name": "address", "type": "STRING", "mode": "NULLABLE"},
        {"name": "area", "type": "STRING", "mode": "NULLABLE"},
        {"name": "station", "type": "STRING", "mode": "NULLABLE"},
        {"name": "url", "type": "STRING", "mode": "NULLABLE"},
        {"name": "twitter_url", "type": "STRING", "mode": "NULLABLE"},
        {"name": "facebook_url", "type": "STRING", "mode": "NULLABLE"},
        {"name": "tabelog_url", "type": "STRING", "mode": "NULLABLE"},
        {"name": "google_map_url", "type": "STRING", "mode": "NULLABLE"},
        {"name": "created_at", "type": "DATETIME", "mode": "NULLABLE"},
        {"name": "updated_at", "type": "DATETIME", "mode": "NULLABLE"},
        {"name": "business_hour", "type": "STRING", "mode": "NULLABLE"},
        {"name": "holiday", "type": "STRING", "mode": "NULLABLE"},
        {"name": "access", "type": "STRING", "mode": "NULLABLE"},
        {"name": "comments_count", "type": "INTEGER", "mode": "NULLABLE"},
        {"name": "likes_count", "type": "INTEGER", "mode": "NULLABLE"}
      ]
      break;
  }
  return bq_schema;
}

function onOpen() {
  const entries = [
    {
      name : "手動でクエリを実行",
      functionName : "execQueryAccordingToDate"
    }
  ];
  ss.addMenu("BigQuery", entries);
};