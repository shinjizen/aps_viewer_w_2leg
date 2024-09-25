const express = require('express');
const { getTwoLeggedToken, getHubs, getProjects, getProjectContents, getItemVersions} = require('../services/aps.js');

let router = express.Router();

router.get('/api/hubs', async function (req, res, next) {
    try {
        const accessToken = await getTwoLeggedToken();
        const hubs = await getHubs(
            accessToken.access_token
        );
        res.json(hubs);
    } catch (err) {
        next(err);
    }
});

router.get('/api/hubs/:hub_id/projects', async function (req, res, next) {
    try {
        const accessToken = await getTwoLeggedToken();
        const projects = await getProjects(
            req.params.hub_id, 
            accessToken.access_token
        );
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

router.get('/api/hubs/:hub_id/projects/:project_id/contents', async function (req, res, next) {
    try {
        const accessToken = await getTwoLeggedToken();
        const contents = await getProjectContents(
            req.params.hub_id, 
            req.params.project_id, 
            req.query.folder_id, 
            // req.internalOAuthToken.access_token
            accessToken.access_token
        );
        res.json(contents);
    } catch (err) {
        next(err);
    }
});

router.get('/api/hubs/:hub_id/projects/:project_id/contents/:item_id/versions', async function (req, res, next) {
    try {
        const accessToken = await getTwoLeggedToken();
        const versions = await getItemVersions(
            req.params.project_id, 
            req.params.item_id, 
            accessToken.access_token
        );
        res.json(versions);
    } catch (err) {
        next(err);
    }
});


module.exports = router;