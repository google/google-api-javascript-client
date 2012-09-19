// Copyright 2012 Google Inc. All Rights Reserved.

/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Sample program demonstrates methods of the
 * Enterprise License Manager API 
 * @author smarquardt@google.com (Stafford Marquardt)
 */
 
/**
 * Loads the Licensing API.
 */
function init() {
	gapi.client.load('licensing', 'v1', auth);
}


/**
 * Authenticates into the Licensing API, using the Client ID specified
 * in the UI.
 */
function auth() {
	var clientId = document.getElementById("clientId").value;
	// Scope for License Manager API
	var scope = 'https://www.googleapis.com/auth/apps.licensing';
	
	var config = {
		'client_id': clientId,
		'scope': scope
	}
	
	gapi.auth.authorize(config, function() {
		console.log('login complete');
		console.log(gapi.auth.getToken());
	});
	
	// Update UI after auth
	$('#authreq').hide();
	$('#lmui').show();
}


/**
 * Calls the appropriate method of the API based on the method selected
 * by the user in the UI.
 */
function manageLicenses(){
	var custID = document.getElementById("custid").value;
	var userID = document.getElementById("userid").value;
	var action = document.getElementById("mgmtaction").value;
	var prodID = document.getElementById("prodid").value;
	var skuID = document.getElementById("skuid").value;
	var oldSkuID = document.getElementById("oldskuid").value;
	
	if (action=="view"){
		viewLicenses(custID, prodID);
	} else if (action=="viewsku") {
		viewLicensesBySku(custID, prodID, skuID);
	} else if (action=="assign") {
		assignLicense(prodID, skuID, userID);
	} else if (action=="bulkassign") {
		bulkAssign(prodID, skuID, userID);
	} else if (action=="reassign") {
		reassign(prodID, oldSkuID, skuID, userID);
	} else if (action=="delete") {
		deleteLicense(prodID, skuID, userID)
	} else if (action=="bulkdelete") {
		bulkDelete(prodID, skuID, userID);
	}
}


/**
 * Updates the SKU picklist in the UI each time the product is changed.
 */
function updateSkus(){
	var prodID = document.getElementById("prodid").value;
	if (prodID=='Google-Coordinate'){
		var skuList = ['Google-Coordinate'];
	} else if (prodID == "Google-Drive-storage"){
		var skuList = [
		'Google-Drive-storage-20GB',
		'Google-Drive-storage-50GB',
		'Google-Drive-storage-200GB',
		'Google-Drive-storage-400GB',
		'Google-Drive-storage-1TB',
		'Google-Drive-storage-2TB',
		'Google-Drive-storage-4TB',
		'Google-Drive-storage-8TB',
		'Google-Drive-storage-16TB'
		]
	}
	var skuPicker = "";
	for (sku in skuList){
		skuPicker += '<option value="' + skuList[sku] + '">' + skuList[sku] +
			'</option>';
	}
	$(".skupicker").html(skuPicker);
}


/**
 * Updates the fields that display in the UI each time a different API
 * method is selected by the user.
 */
function updateUI(){
	var action = document.getElementById("mgmtaction").value;
	
	if (action=="view"){
		$('.userinfo').hide();
		$('.prodinfo').show();
		$('.skuinfo').hide();
		$('.oldskuinfo').hide();
	} else if (action=="viewsku"){
		$('.userinfo').hide();
		$('.prodinfo').show();
		$('.skuinfo').show();
		$('.oldskuinfo').hide();
	} else if (action=="reassign"){
		$('.userinfo').show();
		$('.prodinfo').show();
		$('.skuinfo').show();
		$('.oldskuinfo').show();
	} else {
		$('.userinfo').show();
		$('.prodinfo').show();
		$('.skuinfo').show();
		$('.oldskuinfo').hide();
	}
	
	if (action=="bulkassign" || action=="bulkdelete"){
		$('#userlabel').html('Target Users (comma separated)');
		$('#skulabel').html('SKU');
	} else if (action=="assign" || action=="delete"){
		$('#userlabel').html('Target User');
		$('#skulabel').html('SKU');
	} else if (action=="reassign"){
		$('#skulabel').html('New SKU');
	}
	
}

/**
 * Calls the listForProduct method of the API to retrieve all licenses
 * assigned for a given product.
 * @param {String} prodID The product for which to retrieve licenses.
 * @param {String} custID The domain name for which to retrieve licenses.
 */
function viewLicenses(custID, prodID) {
	var request = gapi.client.licensing.licenseAssignments.listForProduct({
		'productId': prodID,
		'customerId': custID
	});
	request.execute(function(resp) {
		console.log(resp);
		document.getElementById("response").innerHTML = "<h3>API Response</h3>";
		if (resp.error){
			document.getElementById("response").innerHTML +=
				JSON.stringify(resp.error);
		} else if (resp.items){
			document.getElementById("response").innerHTML +=
				"<p><strong>Assigned Licenses:</strong></p><ul>";
			for(var i=0;i < resp.items.length;i++) {
				txt = document.createTextNode(resp.items[i].userId);
				document.getElementById("response").innerHTML +=
					"<li>" + resp.items[i].userId + "</li>";
			}
			document.getElementById("response").innerHTML += "</ul>";
		} else {
			document.getElementById("response").innerHTML +=
				"<em>No licenses found</em>";
		}
		document.getElementById("response").innerHTML += "</ul>";
	});
}


/**
 * Calls the listForProductAndSku method of the API to retrieve all licenses
 * assigned for a given product and SKU combination.
 * @param {String} prodID The product for which to retrieve licenses.
 * @param {String} custID The domain name for which to retrieve licenses.
 * @param {String} skuID The SKU for which to retrieve licenses.
 */
function viewLicensesBySku(custID, prodID, skuID) {
	var request = gapi.client.licensing.licenseAssignments.listForProductAndSku({
		'productId': prodID,
		'customerId': custID,
		'skuId':skuID
	});
	request.execute(function(resp) {
		console.log(resp);
		document.getElementById("response").innerHTML = "<h3>API Response</h3>";
		if (resp.error){
			document.getElementById("response").innerHTML +=
				JSON.stringify(resp.error);
		} else if (resp.items){
			document.getElementById("response").innerHTML +=
				"<p><strong>Assigned Licenses:</strong></p><ul>";
			for(var i=0;i < resp.items.length;i++) {
				txt = document.createTextNode(resp.items[i].userId);
				document.getElementById("response").innerHTML += "<li>" +
					resp.items[i].userId + "</li>";
			}
			document.getElementById("response").innerHTML += "</ul>";
		} else {
			document.getElementById("response").innerHTML +=
				"<em>No licenses found</em>"
		}
		document.getElementById("response").innerHTML += "</ul>";
	});
}


/**
 * Calls the insert method of the API to assign a license to a user for
 * the specified product and SKU.
 * @param {String} prodID The product for which to assign a license.
 * @param {String} skuID The SKU for which to assign a license.
 * @param {String} userID The user to receive a license.
 */
function assignLicense(prodID, skuID, userID) {
	var request = gapi.client.licensing.licenseAssignments.insert({
		'productId': prodID,
		'skuId': skuID,
		'resource': {"userId": userID}
	});
	request.execute(function(resp) {
		document.getElementById("response").innerHTML = "<h3>API Response</h3>" +
			JSON.stringify(resp);
	});
}


/**
 * Calls the update method of the API to change a user's SKU given an
 * existing license for the same product.
 * @param {String} prodID The product for which to swap a license.
 * @param {String} oldSkuID The current SKU to swap out.
 * @param {String} newSkuID The new SKU to assign.
 * @param {String} userID The user to be updated.
 */
function reassign(prodID, oldSkuID, newSkuID, userID) {
	var request = gapi.client.licensing.licenseAssignments.update({
		'productId': prodID,
		'skuId': oldSkuID,
		'userId' : userID,
		'resource': {"skuId": newSkuID}
	});
	request.execute(function(resp) {
		document.getElementById("response").innerHTML = "<h3>API Response</h3>" +
			JSON.stringify(resp);
	});
}


/**
 * Calls the delete method of the API to unassign a license from a user for
 * the specified product and SKU.
 * @param {String} prodID The product for which to unassign a license.
 * @param {String} skuID The SKU for which to unassign a license.
 * @param {String} userID The user to lose a license.
 */
function deleteLicense(prodID, skuID, userID) {
	var request = gapi.client.licensing.licenseAssignments.delete({
		"userId": userID,
		'productId': prodID,
		'skuId': skuID
	});
	request.execute(function(resp) {
		document.getElementById("response").innerHTML = "<h3>API Response</h3>" +
			JSON.stringify(resp);
		
	});
}


/**
 * Calls the insert method of the API to assign licenses to multiple users for
 * the specified product and SKU in batch.
 * @param {String} prodID The product for which to assign a license.
 * @param {String} skuID The SKU for which to assign a license.
 * @param {Array.<string>} userIDs The users to receive licenses.
 */
function bulkAssign(prodID, skuID, userIDs) {
	var rpcBatch = gapi.client.newRpcBatch(); // Set up batch
	gapi.client.register('licensing.licenseAssignments.insert', 'v1');
	
	var users = userIDs.split(','); // Split CSV field into individual users
	for (id in users) { // Go through each user
		var user = $.trim(users[id]); // Trim whitespace around username
		var batchRequest = gapi.client.licensing.licenseAssignments.insert({
			'resource': {"userId": user},
			'productId': prodID,
			'skuId': skuID
		});
		rpcBatch.add(batchRequest);
	}
	rpcBatch.execute(batchCallback);
}


/**
 * Calls the delete method of the API to unassign licenses from multiple users
 * for the specified product and SKU in batch.
 * @param {String} prodID The product for which to unassign a license.
 * @param {String} skuID The SKU for which to unassign a license.
 * @param {Array.<string>} userIDs The users to lose licenses.
 */
function bulkDelete(prodID, skuID, userIDs) {
	var rpcBatch = gapi.client.newRpcBatch(); // Set up batch
	gapi.client.register('licensing.licenseAssignments.delete', 'v1');
	
	var users = userIDs.split(','); // Split CSV field into individual users
	for (id in users) { // Go through each user
		var user = $.trim(users[id]); // Trim whitespace around username
		var batchRequest = gapi.client.licensing.licenseAssignments.delete({
			'userId': user,
			'productId': prodID,
			'skuId': skuID
		});
		rpcBatch.add(batchRequest);
	}
	rpcBatch.execute(batchCallback);
}


/**
 * Displays the results of a batch operation.
 * @param {Object} jsonResponse The response returned by License Manager API
 * 	in JSON format.
 * @param {Object} rawResponse Raw response returned by the License Manager API.
 */
function batchCallback(jsonResponse, rawResponse) {
	// Clear and prep the response panel
	document.getElementById("response").innerHTML = "<h3>API Response</h3>"; 
	
	for (var id in jsonResponse) {
		console.log(jsonResponse[id]); // Logs each individual response in Console
	}
	// Log the raw string response, a JSON-string representing the id-response map
	document.getElementById("response").innerHTML += JSON.stringify(rawResponse); 
}
