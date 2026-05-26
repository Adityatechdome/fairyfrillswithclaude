// ff-rts-app.js — mounts FinalPage for the Once Upon a Frill / Ready to Ship page.

function FFApp() {
  return (
    <FinalPage
      primary="#8B2D4A"
      tweaks={{
        productCount: 30,
        cardDensity: "regular",
        imageRatio: "3/4",
        darkSections: false,
        showTrustStrip: true,
        heroCopy: {
          title: 'Once upon a 24-hour dispatch.',
          sub: <>Pulled from the atelier, tissue-wrapped, and out the door before the kettle's boiled. <em>Magic, basically.</em></>,
        },
      }}
    />
  );
}

const root = document.getElementById('ff-rts-root');
if (root) {
  ReactDOM.createRoot(root).render(<FFApp />);
}
