onRecordAfterCreateSuccess(async (e) => {
    console.log("addAdminOnGroupCreate: Hook triggered.");
    console.log("Received record:", e.record);
    
    const collectionName = e.record.collection().name;
    console.log("Record collection name:", collectionName);
    if (collectionName !== "groups") {
      console.log("addAdminOnGroupCreate: Not a 'groups' record. Exiting hook.");
      return e.next();
    }
    
    const userId = e.record.get("created_by");
    const groupId = e.record.get("id");
    console.log("Extracted userId:", userId, "groupId:", groupId);
    
    if (!userId || !groupId) {
      console.error("addAdminOnGroupCreate: Missing userId or groupId.");
      return e.next();
    }
    
    try {
      console.log("addAdminOnGroupCreate: Preparing to create admin record in group_members using Record API...");
      
      // Hole die Collection-Instanz der group_members
      const groupMembersCollection = e.app.findCollectionByNameOrId("group_members");
      if (!groupMembersCollection) {
        console.error("addAdminOnGroupCreate: 'group_members'-Collection nicht gefunden.");
        return e.next();
      }
      
      // Erstelle einen neuen Record für die group_members-Collection
      const newRecord = new Record(groupMembersCollection);
      newRecord.set("user_id", userId);
      newRecord.set("group_id", groupId);
      newRecord.set("role", "admin");
      
      console.log("addAdminOnGroupCreate: Saving new record:", newRecord);
      await e.app.save(newRecord);
      console.log("addAdminOnGroupCreate: Successfully created admin record in group_members.");
    } catch (err) {
      console.error("addAdminOnGroupCreate: Error creating admin record:", err);
    }
    
    e.next();
  }, "groups");
  