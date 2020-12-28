/**
	Converts ResultSet into JSON object for single result.
	This makes it easier to parse for FHIR resources builder code templates.
 
	@author Frazer Smith
	@param {object} resultSet - The ResultSet object to retrieve from.
	@returns {object} The ResultSet as a JSON object.
 */
function getResultSet(resultSet) {
	var rsmd = resultSet.getMetaData();
	var numColumns = rsmd.getColumnCount();
	var obj = {};

	for (var index = 1; index < numColumns + 1; index++) {
		var columnName = rsmd.getColumnName(index);

		switch (rsmd.getColumnType(index)) {
			case java.sql.Types.ARRAY:
				obj["".concat(columnName)] = resultSet.getArray(columnName);
				break;
			case java.sql.Types.BIGINT:
				obj["".concat(columnName)] = resultSet.getInt(columnName);
				break;
			case java.sql.Types.BLOB:
				obj["".concat(columnName)] = getResultSetString(
					resultSet,
					columnName
				);

				break;
			case java.sql.Types.BOOLEAN:
				obj["".concat(columnName)] = resultSet.getBoolean(columnName);
				break;
			case java.sql.Types.CHAR:
				obj["".concat(columnName)] = resultSet.getString(columnName);
				break;
			case java.sql.Types.CLOB:
				obj["".concat(columnName)] = getResultSetString(
					resultSet,
					columnName
				);

				break;
			case java.sql.Types.DATE:
				obj["".concat(columnName)] = resultSet.getDate(columnName);
				break;
			case java.sql.Types.DOUBLE:
				obj["".concat(columnName)] = resultSet.getDouble(columnName);
				break;
			case java.sql.Types.FLOAT:
				obj["".concat(columnName)] = resultSet.getFloat(columnName);
				break;
			case java.sql.Types.INTEGER:
				obj["".concat(columnName)] = resultSet.getInt(columnName);
				break;
			case java.sql.Types.NCHAR:
				obj["".concat(columnName)] = resultSet.getNString(columnName);
				break;
			case java.sql.Types.NVARCHAR:
				obj["".concat(columnName)] = resultSet.getNString(columnName);
				break;
			case java.sql.Types.SMALLINT:
				obj["".concat(columnName)] = resultSet.getInt(columnName);
				break;
			case java.sql.Types.TIMESTAMP:
				obj["".concat(columnName)] = resultSet.getTimestamp(columnName);
				break;
			case java.sql.Types.TINYINT:
				obj["".concat(columnName)] = resultSet.getInt(columnName);
				break;
			case java.sql.Types.VARCHAR:
				obj["".concat(columnName)] = resultSet.getString(columnName);
				break;
			default:
				obj["".concat(columnName)] = resultSet.getObject(columnName);
				break;
		}
	}

	return obj;
}
