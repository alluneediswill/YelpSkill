import { Pool, QueryResult } from "pg";
import { KMSDecrypter } from "../util/kms-decrypter";
import { Restaurant } from "./restaurant";

const dbUserDecrypter = new KMSDecrypter(process.env["db_user"]);
const dbPasswordDecrypter = new KMSDecrypter(process.env["db_pw"]);
const dbHostDecrypter = new KMSDecrypter(process.env["db_host"]);

const QUERY_STRING = "SELECT id, name, url, overall_rating, review_text, review_rating, review_user FROM yelp_restaurant.r1 \
WHERE ST_DWithin(ST_GeogFromText('POINT($1 $2)'), loc, 20000, false) ORDER BY ST_DISTANCE(ST_GeogFromText('POINT($1 $2)'), loc) LIMIT 2000";

class RestaurantDataClient {
    geoDBPool: Promise<Pool>;
    constructor() {
        this.geoDBPool = Promise.all([dbHostDecrypter.text(), dbUserDecrypter.text(), dbPasswordDecrypter.text()]).then(([dbHost, dbUser, dbPassword]) => {
            return new Pool({
                host: dbHost,
                database: "geo_db",
                user: dbUser,
                password: dbPassword
              });
        });
    }

    getRestaurants(latitude: number, longitude: number): Promise<Restaurant[]> {
        return this.geoDBPool.then( pool => {
            return pool.query(QUERY_STRING, [longitude, latitude])
            .then(this.mapRow);
        });
    }

    mapRow(result: QueryResult) {
        return result.rows.map(
            row => {
                if (row instanceof Restaurant)
                    return row as Restaurant;
            }
        ).filter(restaurant => restaurant);
    }
}
