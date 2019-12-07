var USERS_SCHEMA = [
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

var COMMENTS_SCHEMA = [
  {"name": "id", "type": "INTEGER", "mode": "NULLABLE"},
  {"name": "body", "type": "STRING", "mode": "NULLABLE"},
  {"name": "image_data", "type": "STRING", "mode": "NULLABLE"},
  {"name": "user_id", "type": "INTEGER", "mode": "NULLABLE"},
  {"name": "shop_id", "type": "INTEGER", "mode": "NULLABLE"},
  {"name": "created_at", "type": "DATETIME", "mode": "NULLABLE"},
  {"name": "updated_at", "type": "DATETIME", "mode": "NULLABLE"}
];

var SHOPS_SCHEMA = [
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
];