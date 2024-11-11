import { Auth } from "./auth/authClass.js";

class ViewAPICall {
    constructor(container) {
        this.container = container;
        this.totalUsage = 0;
    }

    createAPIView(id, requestType, apiContent) {
        const trContainer = document.createElement("tr");
        trContainer.innerHTML = `
            <td>${id}</td>
            <td>${requestType}</td>
            <td>${apiContent}</td>
        `;
        this.container.appendChild(trContainer);
        this.totalUsage++;
    }
}
const apiCount = document.getElementById("api_count");
const container = document.getElementById("api__table");
const viewApiCall = new ViewAPICall(container);

const everyAPICall = await fetch("http://localhost:5500/auth/apiCalls", {
    credentials: "include",
});
const apiCalls = await everyAPICall.json();
const apiCallsData = apiCalls.data;

apiCount.textContent = `Total API Count: ${apiCallsData.length}/20`;

if (apiCallsData.length > 0) {
    apiCallsData.forEach((apiCall) => {        
        viewApiCall.createAPIView(apiCall.api_call_id, apiCall.request_type, apiCall.request_string);
    });
}

const auth = new Auth("http://localhost:5500");
const logoutA = document.getElementById("logout_a");
logoutA.addEventListener("click", async () => {
    const response = await auth.logoutUser();
    if (response === true) {
        window.location.href = "/login";
    }
});