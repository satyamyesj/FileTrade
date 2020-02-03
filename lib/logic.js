/*
 * Licensed under the Apache License, Version 2.0 (the "License");
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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.fileco.com.SampleTransaction} sampleTransaction
 * @transaction
 */
// async function sampleTransaction(tx) {
//     // Save the old value of the asset.
//     const oldValue = tx.asset.value;

//     // Update the asset with the new value.
//     tx.asset.value = tx.newValue;

//     // Get the asset registry for the asset.
//     const assetRegistry = await getAssetRegistry('org.fileco.com.SampleAsset');
//     // Update the asset in the asset registry.
//     await assetRegistry.update(tx.asset);

//     // Emit an event for the modified asset.
//     let event = getFactory().newEvent('org.fileco.com', 'SampleEvent');
//     event.asset = tx.asset;
//     event.oldValue = oldValue;
//     event.newValue = tx.newValue;
//     emit(event);
// }

/**
 * Sample transaction
 * @param {org.fileco.com.RequestAccess} RequestAccess
 * @transaction
 */
async function RequestAccess(tx) {
    var factory=getFactory();
    var newPendingRequest=factory.newResource('org.fileco.com', 'PendingRequest', tx.prID);
    newPendingRequest.rightType=tx.rightType
    newPendingRequest.file=tx.file
    newPendingRequest.user=tx.user
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.fileco.com.PendingRequest');
    // Update the asset in the asset registry.
    await assetRegistry.add(newPendingRequest);
    console.log('#request access request')    
}


/**
 * Sample transaction
 * @param {org.fileco.com.GrantAccess} GrantAccess
 * @transaction
 */

async function GrantAccess(tx){
    var factory=getFactory();
    var newFileRight=factory.newResource('org.fileco.com', 'FileRight', tx.rID);
    newFileRight.rightType=tx.pendingRequest.rightType
    newFileRight.file=tx.pendingRequest.file
    newFileRight.user=tx.pendingRequest.user
    // Get the asset registry for the asset.
    const assetRegistryFR = await getAssetRegistry('org.fileco.com.FileRight');
    // Update the asset in the asset registry.
    await assetRegistryFR.add(newFileRight);  
    const assetRegistryPR= await getAssetRegistry('org.fileco.com.PendingRequest');
    await assetRegistryPR.remove(tx.pendingRequest)
    console.log('#grant permission request v0.2.1') 
}