console.log('Allegro Better Search: Running...');

// handler for closing iframe
document.addEventListener('click', event => {
    const iframe = document.getElementById('ext-products-internal-iframe');

    let target = event.target;
    do {
        if (target === iframe) {
            // Click inside - do nothing.
            return;
        }
        target = target.parentNode;
    } while (target);

    // Click outside - remove iframe.
    iframe?.remove();
});

function alterLinks() {
    const order = new URL(window.location.href).searchParams.get('order');
    const links = document.querySelectorAll("a[data-role-type='product-fiche-link']");

    for (let link of links) {
        const linkHref = link.href;
        if (link.href && link.href.indexOf('https://allegro.pl/') === 0) {
            link.onclick = function () {
                const iframe = document.createElement("iframe");
                document.querySelector("body > div.main-wrapper").appendChild(iframe);

                iframe.style = "position: fixed; z-index: 5000; background: red; top: 5%; height: 90%; left: 10%; width: 80%;";
                iframe.src = linkHref + (order ? `&order=${order}` : '');
                iframe.id = 'ext-products-internal-iframe';
            }
            link.removeAttribute('href');
        }
    }
}

alterLinks();
setInterval(alterLinks, 1000); // repeating, so that it works after scrolling
