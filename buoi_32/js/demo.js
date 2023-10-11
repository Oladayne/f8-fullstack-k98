class F8 {
    static component(nameEl, options ) {
      customElements.define(nameEl, class extends HTMLElement {
        constructor() {
          super();
        }
  
        connectedCallback() {
          if (options.data) {
            const data = options.data();
            Object.keys(data).forEach((key) => {
              window[key] = data[key];
            });
          }
          const templateEl = document.createElement("template");
          templateEl.innerHTML = this.handleVariableTemplate(options.template, options.data);
          console.log(templateEl);
          const templateNode = templateEl.content.cloneNode(true);
          console.log(templateNode);
          this.handleTemplate(templateNode, options.data);
          this.appendChild(templateNode);
         
        }
  
        handleVariableTemplate(strTemplate, data) {
          return strTemplate.replace(/{{(.+?)}}/g, (match, variable) => {
            const value = data && data()[variable];
            console.log(value);
            if (value !== undefined) {
              return value;
            }
            return match;
          });
        }
        
  
  
        handleTemplate(templateNode, data) {
          const btnCounts = templateNode.querySelectorAll("button");
          console.log(templateNode);
                const countNumber = templateNode.querySelector(".count");
                const h1 = templateNode.querySelector("h1");
                btnCounts.forEach((btn) => {
                  const nameAttribute = btn.getAttributeNames();
                  const nameEvent = nameAttribute[0].split("v-on:");
                  const btnEvent = nameEvent[1];
                  const btnAttribute = btn.getAttribute(`v-on:${btnEvent}`);
                  btn.addEventListener(btnEvent, () => {
                    if (btnAttribute === "count--") {
                      countNumber.innerText = count--;
                    }
                    if (btnAttribute === "count++") {
                      countNumber.innerText =count++;
                    }
                    if (btnAttribute.includes("title=")) {
                      const contentTitle = btnAttribute.split("title=");
                      h1.innerText = contentTitle[1];
                    }
                  });
                });
        }
      });
    }
  }
  