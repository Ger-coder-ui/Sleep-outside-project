export default class Alert {
  constructor(jsonUrl, parentSelector) {
    this.url = jsonUrl;
    this.parent = document.querySelector(parentSelector);
  }

  async showAlerts() {
    try {
      const response = await fetch(this.url);
      const alerts = await response.json();

      if (alerts.length > 0) {
        const section = document.createElement('section');
        section.classList.add('alert-list');

        alerts.forEach(alert => {
          const p = document.createElement('p');
          p.textContent = alert.message;
          p.style.backgroundColor = alert.background;
          p.style.color = alert.color;
          section.appendChild(p);
        });

        this.parent.prepend(section);
      }
    } catch (error) {
      console.error('Failed to load alerts:', error);
    }
  }
}
