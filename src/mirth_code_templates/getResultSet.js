/**
	Converts ResultSet into JSON object for single result.
	This makes it easier to parse for FHIR resources builder code templates.
 
	@author Frazer Smith
	@param {object} resultSet - The ResultSet object to retrieve from.
	@returns {object} The ResultSet as a JSON object.
 */
function getResultSet(resultSet) {
	const rsmd = resultSet.getMetaData();
	const numColumns = rsmd.getColumnCount();
	const obj = {};

	for (let index = 1; index < numColumns + 1; index++) {
		const columnName = rsmd.getColumnName(index);

		if (rsmd.getColumnType(index) == java.sql.Types.ARRAY) {
			obj[`${columnName}`] = resultSet.getArray(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.BIGINT) {
			obj[`${columnName}`] = resultSet.getInt(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.BOOLEAN) {
			obj[`${columnName}`] = resultSet.getBoolean(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.BLOB) {
			obj[`${columnName}`] = resultSet.getBlob(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.NCHAR) {
			obj[`${columnName}`] = resultSet.getNString(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.CHAR) {
			obj[`${columnName}`] = resultSet.getString(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.DOUBLE) {
			obj[`${columnName}`] = resultSet.getDouble(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.FLOAT) {
			obj[`${columnName}`] = resultSet.getFloat(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.INTEGER) {
			obj[`${columnName}`] = resultSet.getInt(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.NVARCHAR) {
			obj[`${columnName}`] = resultSet.getNString(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.VARCHAR) {
			obj[`${columnName}`] = resultSet.getString(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.TINYINT) {
			obj[`${columnName}`] = resultSet.getInt(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.SMALLINT) {
			obj[`${columnName}`] = resultSet.getInt(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.DATE) {
			obj[`${columnName}`] = resultSet.getDate(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.TIMESTAMP) {
			obj[`${columnName}`] = resultSet.getTimestamp(columnName);
		} else {
			obj[`${columnName}`] = resultSet.getObject(columnName);
		}
	}

	return obj;
}
