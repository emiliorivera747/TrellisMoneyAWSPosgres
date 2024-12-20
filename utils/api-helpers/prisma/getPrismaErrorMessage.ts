
export function getPrismaError(errorCode: unknown): string {
    switch (errorCode) {
        case "P1000":
            return `Authentication failed against database server, the provided database credentials are not valid. Please make sure to provide valid database credentials.`;
        case "P1001":
            return `Can't reach database server. Please make sure your database server is running.`;
        case "P1002":
            return `The database server was reached but timed out. Please try again. Please make sure your database server is running.`;
        case "P1003":
            return `Database does not exist.`;
        case "P1008":
            return `Operations timed out.`;
        case "P1009":
            return `Database already exists on the database server.`;
        case "P1010":
            return `User was denied access on the database.`;
        case "P1011":
            return `Error opening a TLS connection.`;
        case "P1012":
            return `An error occurred.`;
        case "P1013":
            return `The provided database string is invalid.`;
        case "P1014":
            return `The underlying model does not exist.`;
        case "P1015":
            return `Your Prisma schema is using features that are not supported for the version of the database.`;
        case "P1016":
            return `Your raw query had an incorrect number of parameters.`;
        case "P1017":
            return `Server has closed the connection.`;
        case "P2000":
            return `The provided value for the column is too long for the column's type.`;
        case "P2001":
            return `The record searched for in the where condition does not exist.`;
        case "P2002":
            return `Unique constraint failed.`;
        case "P2003":
            return `Foreign key constraint failed on the field.`;
        case "P2004":
            return `A constraint failed on the database.`;
        case "P2005":
            return `The value stored in the database for the field is invalid for the field's type.`;
        case "P2006":
            return `The provided value for the field is not valid.`;
        case "P2007":
            return `Data validation error.`;
        case "P2008":
            return `Failed to parse the query.`;
        case "P2009":
            return `Failed to validate the query.`;
        case "P2010":
            return `Raw query failed.`;
        case "P2011":
            return `Null constraint violation.`;
        case "P2012":
            return `Missing a required value.`;
        case "P2013":
            return `Missing the required argument for field.`;
        case "P2014":
            return `The change you are trying to make would violate the required relation`;
        case "P2015":
            return `A related record could not be found.`;
        case "P2016":
            return `Query interpretation error.`;
        case "P2017":
            return `The records for relation between the parent and child models are not connected.`;
        case "P2018":
            return `The required connected records were not found.`;
        case "P2019":
            return `Input error.`;
        case "P2020":
            return `Value out of range for the type.`;
        case "P2021":
            return `The table does not exist in the current database.`;
        case "P2022":
            return `The column does not exist in the current database.`;
        case "P2023":
            return `Inconsistent column data.`;
        case "P2024":
            return `Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool)`;
        case "P2025":
            return `An operation failed because it depends on one or more records that were required but not found.`;
        case "P2026":
            return `The current database provider doesn't support a feature that the query used.`;
        case "P2027":
            return `Multiple errors occurred on the database during query execution.`;
        case "P2028":
            return `Transaction API error.`;
        case "P2029":
            return `Query parameter limit exceeded error.`;
        case "P2030":
            return `Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema`;
        case "P2031":
            return `Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set`;
        case "P2033":
            return `A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers`;
        case "P2034":
            return `Transaction failed due to a write conflict or a deadlock. Please retry your transaction`;
        case "P2035":
            return `Assertion violation on the database.`;
        case "P2036":
            return `Error in external connector.`;
        case "P2037":
            return `Too many database connections opened.`;
        default:
            return "Prisma error";
    }
}
