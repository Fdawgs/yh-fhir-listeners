/**
    Converts ResultSet into JSON object for single result.
    This makes it easier to parse for FHIR resources builder code templates.

	@author Frazer Smith
	@param {ResultSet} resultSet - The ResultSet object to retrieve from.
	@return {Object} The ResultSet as a JSON object.
*/
function getResultSet(resultSet) {
	var rsmd = resultSet.getMetaData();
	var numColumns = rsmd.getColumnCount();
	var obj = {};

	for (var index = 1; index < numColumns + 1; index++) {
		var columnName = rsmd.getColumnName(index);

		if (rsmd.getColumnType(index) == java.sql.Types.ARRAY) {
			obj[''.concat(columnName)] = resultSet.getArray(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.BIGINT) {
			obj[''.concat(columnName)] = resultSet.getInt(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.BOOLEAN) {
			obj[''.concat(columnName)] = resultSet.getBoolean(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.BLOB) {
			obj[''.concat(columnName)] = resultSet.getBlob(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.DOUBLE) {
			obj[''.concat(columnName)] = resultSet.getDouble(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.FLOAT) {
			obj[''.concat(columnName)] = resultSet.getFloat(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.INTEGER) {
			obj[''.concat(columnName)] = resultSet.getInt(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.NVARCHAR) {
			obj[''.concat(columnName)] = resultSet.getNString(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.VARCHAR) {
			obj[''.concat(columnName)] = resultSet.getString(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.TINYINT) {
			obj[''.concat(columnName)] = resultSet.getInt(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.SMALLINT) {
			obj[''.concat(columnName)] = resultSet.getInt(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.DATE) {
			obj[''.concat(columnName)] = resultSet.getDate(columnName);
		} else if (rsmd.getColumnType(index) == java.sql.Types.TIMESTAMP) {
			obj[''.concat(columnName)] = resultSet.getTimestamp(columnName);
		} else {
			obj[''.concat(columnName)] = resultSet.getObject(columnName);
		}
	}

	return obj;
}
