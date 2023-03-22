/**
 * @author Frazer Smith
 * @description Converts ResultSet into JSON object for single result.
 * This makes it easier to parse for FHIR resources builder code templates.
 * @param {object} resultSet - The ResultSet object to retrieve from.
 * @returns {object} The ResultSet as a JSON object.
 */
function getResultSet(resultSet) {
	const rsmd = resultSet.getMetaData();
	const numColumns = rsmd.getColumnCount();
	const obj = {};

	for (let index = 1; index < numColumns + 1; index++) {
		const columnName = rsmd.getColumnName(index);

		switch (rsmd.getColumnType(index)) {
			case java.sql.Types.ARRAY:
				obj[`${columnName}`] = resultSet.getArray(columnName);
				break;
			case java.sql.Types.BIGINT:
				obj[`${columnName}`] = resultSet.getInt(columnName);
				break;
			case java.sql.Types.BLOB:
				obj[`${columnName}`] = getResultSetString(
					resultSet,
					columnName
				);
				break;
			case java.sql.Types.BOOLEAN:
				obj[`${columnName}`] = resultSet.getBoolean(columnName);
				break;
			case java.sql.Types.CHAR:
				obj[`${columnName}`] = resultSet.getString(columnName);
				break;
			case java.sql.Types.CLOB:
				obj[`${columnName}`] = getResultSetString(
					resultSet,
					columnName
				);
				break;
			case java.sql.Types.DATE:
				obj[`${columnName}`] = resultSet.getDate(columnName);
				break;
			case java.sql.Types.DOUBLE:
				obj[`${columnName}`] = resultSet.getDouble(columnName);
				break;
			case java.sql.Types.FLOAT:
				obj[`${columnName}`] = resultSet.getFloat(columnName);
				break;
			case java.sql.Types.INTEGER:
				obj[`${columnName}`] = resultSet.getInt(columnName);
				break;
			case java.sql.Types.NCHAR:
				obj[`${columnName}`] = resultSet.getNString(columnName);
				break;
			case java.sql.Types.NVARCHAR:
				obj[`${columnName}`] = resultSet.getNString(columnName);
				break;
			case java.sql.Types.SMALLINT:
				obj[`${columnName}`] = resultSet.getInt(columnName);
				break;
			case java.sql.Types.TIMESTAMP:
				obj[`${columnName}`] = resultSet.getTimestamp(columnName);
				break;
			case java.sql.Types.TINYINT:
				obj[`${columnName}`] = resultSet.getInt(columnName);
				break;
			case java.sql.Types.VARCHAR:
				obj[`${columnName}`] = resultSet.getString(columnName);
				break;
			default:
				obj[`${columnName}`] = resultSet.getObject(columnName);
				break;
		}
	}

	return obj;
}
