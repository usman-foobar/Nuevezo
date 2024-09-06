DB_NAME="your_database_name"
DB_USER="your_database_user"
DB_PASS="your_database_password"

# Export environment variables
export PGPASSWORD=$DB_PASS

# Run SQL script
psql -U $DB_USER -d $DB_NAME -f setup.sql

echo "Database setup complete!"
