import { Mockgoose } from "mockgoose-fix";
import * as mongoose from "mongoose";

(mongoose as any).Promise = global.Promise;

if (process.env.NODE_ENV === "testing") {

  const mockgoose = new Mockgoose(mongoose);
  mockgoose.helper.setDbVersion("3.4.3");

  mockgoose.prepareStorage().then((): void => {
    mongoose.connect("mongodb://192.168.1.33/dev-busy-day", {
      useMongoClient: true,
    });
  });

} else {

  mongoose.connect("mongodb://192.168.1.33/dev-busy-day", {
    useMongoClient: true,
  });

}

export { mongoose };
