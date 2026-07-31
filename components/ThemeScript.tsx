export default function ThemeScript() {
  const code = `(function(){try{var k='bet939-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
