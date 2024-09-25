const { SdkManagerBuilder } = require('@aps_sdk/autodesk-sdkmanager');
const { AuthenticationClient, Scopes} = require('@aps_sdk/authentication');
const { DataManagementClient } = require('@aps_sdk/data-management');
const { APS_CLIENT_ID, APS_CLIENT_SECRET} = require('../config.js');

const sdkManager = SdkManagerBuilder.create().build();
const authenticationClient = new AuthenticationClient(sdkManager);
const dataManagementClient = new DataManagementClient(sdkManager);
const service = module.exports = {};

// Two Legged Authentication
service.getTwoLeggedToken = async () => await authenticationClient.getTwoLeggedToken(APS_CLIENT_ID, APS_CLIENT_SECRET, [
    Scopes.DataRead,
    Scopes.ViewablesRead
]);

// Browsing Hubs
service.getHubs = async (accessToken) => {
    const resp = await dataManagementClient.getHubs(accessToken);
    return resp.data;
};

service.getProjects = async (hubId, accessToken) => {
    const resp = await dataManagementClient.getHubProjects(accessToken, hubId);
    return resp.data;
};

service.getProjectContents = async (hubId, projectId, folderId, accessToken) => {
    if (!folderId) {
        const resp = await dataManagementClient.getProjectTopFolders(accessToken, hubId, projectId);
        return resp.data;
    } else {
        const resp = await dataManagementClient.getFolderContents(accessToken, projectId, folderId);
        return resp.data;
    }
};

service.getItemVersions = async (projectId, itemId, accessToken) => {
    const resp = await dataManagementClient.getItemVersions(accessToken, projectId, itemId);
    return resp.data;
};