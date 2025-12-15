async function loadComponent(path, targetSelector) {
  const res = await fetch(path);
  const html = await res.text();

  const container = document.querySelector(targetSelector);
  container.innerHTML = html;

  const scripts = container.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    if (oldScript.src) {
      newScript.src = oldScript.src;
    } else {
      newScript.textContent = oldScript.textContent;
    }
    document.body.appendChild(newScript);
    oldScript.remove();
  });
}

loadComponent("/HomeComponents/heroSection.html", "#heroSection");
loadComponent("/HomeComponents/displayProducts.html", "#displayProducts");
loadComponent("./Components/navbar.html", "#navbar");
loadComponent("./Components/footer.html", "#footer");
loadComponent("/HomeComponents/joinUs.html", "#joinUs");