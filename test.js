const kintoneDomain = 'nkr-group.cybozu.com';
const apiToken = 'tx0VnjaGVtSpUfUTTmYsIPQPmzZGsX0tta53MVNf';
const appId = '3452';

// kintone APIのエンドポイントとヘッダー設定
const endpoint = `https://${kintoneDomain}/k/v1/record.json`; // レコード更新用のエンドポイント
const headers = {
  'X-Cybozu-API-Token': apiToken,
  'Content-Type': 'application/json'
};

try {
  const query = `EmployeeNumber = "${employeeNumber}"`;
  const searchResponse = await fetch(`${endpoint}?app=${appId}&query=${encodeURIComponent(query)}`, { method: 'GET', headers: headers });
  const searchData = await searchResponse.json();
  const records = searchData.records;

  if (records.length > 0) {
    console.log("Record found. Updating...");
    
    // 更新処理の例
    const recordId = records[0].$id.value; // レコードIDの取得
    const updatePayload = JSON.stringify({
      app: appId,
      id: recordId,
      record: {
        // 更新したいフィールドのキーと値を設定
        "FieldName": {
          "value": "新しい値"
        }
      }
    });

    const updateResponse = await fetch(endpoint, { method: 'PUT', headers: headers, body: updatePayload });

    if (!updateResponse.ok) {
      throw new Error('Record update failed');
    }
    console.log("Record updated successfully");
  } else {
    console.log("No record found. Creating a new one...");
    // 新規作成処理をここに記述...
  }
} catch (error) {
  console.error("Error processing employee data:", error);
}