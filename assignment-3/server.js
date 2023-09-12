const http = require("http");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const port = 3000;
const host = "localhost";
const parseId = (path, level) => {
    const parts = path.split("/");
    return parts[level];
};
const verifyPathMatch = (path, pattern) => {
    const parts = path.split("/");
    if (pathParts.length !== patternParth.length) {
        return false;
    }
    // Implement your logic
};
const readApplicationsFromFile = () => {
    try {
        const data = fs.readFileSync("job-applications.json", "utf8");
        return JSON.parse(data);
    } catch (err) {
        return { applications: {} };
    }
};
const writeApplicationsToFile = (applications) => {
    fs.writeFileSync(
        "job-applications.json",
        JSON.stringify(applications, null, 2)
    );
};
const getAllApplications = (res) => {
    const applicationsData = readApplicationsFromFile();
    const applications = Object.values(applicationsData.applications);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(applications));
};
const createApplication = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end", () => {
        const newApplication = JSON.parse(body);
        const applicationsData = readApplicationsFromFile();
        const applicationId = uuidv4();
        newApplication.id = applicationId;
        applicationsData.applications[applicationId] = newApplication;
        writeApplicationsToFile(applicationsData);
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(newApplication));
    });
};
const getApplication = (req, res) => {
    const applicationId = parseId(req.url, 2);
    const applicationsData = readApplicationsFromFile();
    const application = applicationsData.applications[applicationId];
    if (application) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(application));
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Application not found");
    }
};
const updateApplicationStatus = (req, res) => {
    const applicationId = parseId(req.url, 2);
    const applicationsData = readApplicationsFromFile();
    const application = applicationsData.applications[applicationId];
    if (application) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const updateData = JSON.parse(body);
            application.status = updateData.status;
            writeApplicationsToFile(applicationsData);
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(application));
        });
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Application not found");
    }
};
const deleteApplication = (req, res) => {
    const applicationId = parseId(req.url, 2);
    const applicationsData = readApplicationsFromFile();
    const application = applicationsData.applications[applicationId];
    if (application) {
        delete applicationsData.applications[applicationId];
        writeApplicationsToFile(applicationsData);
        res.writeHead(204);
        res.end();
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Application not found");
    }
};
const server = http.createServer((req, res) => {
    const isPathMatch = verifyPathMatch(req.url);
    if (req.url === "/applications" && req.method === "GET") {
        getAllApplications(res);
    } else if (req.url === "/applications" && req.method === "POST") {
        createApplication(req, res);
    } else if (isPathMatch && req.method === "PATCH") {
        updateApplicationStatus(req, res);
    } else if (isPathMatch && req.method === "GET") {
        getApplication(req, res);
    } else if (isPathMatch && req.method === "DELETE") {
        deleteApplication(req, res);
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Wrong Address");
    }
});
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
