const Model = require("../common/Model");

class ActivityLogModel extends Model {
  constructor() {
    super();

    this.userId = {
      type: "INT",
      null: false,
      
    };

    this.userName = {
      type: "VARCHAR(100)",
      null: false,
    };

    this.userAvatar = {
      type: "VARCHAR(100)",
    };

    this.actionType = {
      type: "VARCHAR(50)",
      null: false,
    };

    this.category = {
      type: "VARCHAR(50)",
      null: false,
    };

    this.description = {
      type: "VARCHAR(500)",
      null: false,
    };

    this.entityName = {
      type: "VARCHAR(200)",
    };

    this.entityId = {
      type: "INT",
    };

    this.timestamp = {
      type: "DATETIME DEFAULT CURRENT_TIMESTAMP",
      null: false,
    };
  }
}

const ActivityLogs = new ActivityLogModel();
ActivityLogs.createTable().catch((e) => {
  console.log(e);
  console.log("error in activity log model");
});

module.exports = ActivityLogs;
