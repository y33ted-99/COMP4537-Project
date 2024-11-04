class ViewAPICall {
    constructor(container) {
        this.container = container;
    }

    createAPIView(id, requestType, apiContent) {
        const trContainer = document.createElement("tr");
        trContainer.innerHTML = `
            <td>${id}</td>
            <td>${requestType}</td>
            <td>${apiContent}</td>
        `;
        this.container.appendChild(trContainer);
    }
}