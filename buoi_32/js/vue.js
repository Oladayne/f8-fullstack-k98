class F8 {
  static component(nameEl, options = {}) {
    customElements.define(nameEl, class extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        const templateEl = document.createElement('template');
        templateEl.innerHTML = this.handleVariableTemplate(options.template, options.data);
        const templateNode = templateEl.content.cloneNode(true);
        this.handleTemplate(templateNode, options.data);
        this.appendChild(templateNode);
      }

      handleVariableTemplate(strTemplate, data) {
        return strTemplate.replace(/{{(.+?)}}/g, (match, variable) => {
          const value = data && data()[variable];
          if (value !== undefined) {
            return value;
          }
          return match;
        });
      }
      
      handleTemplate(templateNode, data) {
        const eventElements = templateNode.querySelectorAll('[v-on]');
        eventElements.forEach(element => {
          const eventName = element.getAttribute('v-on');
          const eventHandler = data()[eventName];
          if (eventHandler) {
            element.addEventListener(eventName, eventHandler);
          }
        });
      }
    });
  }
}
