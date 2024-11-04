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

const container = document.getElementById("api__table");
const apiCall = new ViewAPICall(container);
apiCall.createAPIView("1", "POST", "{contentakdl;aksd}")