import { Collection, ModifyResult, MongoClient } from "mongodb";
import { env } from "../environments/environment";
import { Link } from "../interfaces/link.interface";

export class LinksService {
  private instance: LinksService | undefined;
  private mongoClient: MongoClient;

  constructor() {
    this.mongoClient = new MongoClient(env.clusterUrl);

    if (LinksService.prototype.instance instanceof LinksService) {
      this.connectToDatabase();
      return LinksService.prototype.instance;
    }

    LinksService.prototype.instance = this;

    return this;
  }

  connectToDatabase(): Collection {
    const database = this.mongoClient.db(env.database);

    return database.collection(env.collection);
  }

  add(link: Link): Promise<Link> {
    return this.connectToDatabase()
      .countDocuments()
      .then(value => {
        link._id = value + 1;

        return this.connectToDatabase()
          .insertOne(link)
          .then(() => {
            return new Promise((resolve, reject) => {
              resolve(link);
            });
          });
      });
  }

  get(linkId: string): Promise<Link | null> {
    return this.connectToDatabase()
      .findOne<Link | null>({ shortUrlId: linkId });
  }

  remove(linkId: string): Promise<Link | ModifyResult> {
    return this.connectToDatabase()
      .findOneAndDelete({ shortUrlId: linkId });
  }
}
