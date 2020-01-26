function initMini() {
  const by = {
    id(id) {
      return document.getElementById(id);
    },
    sanitizedSelector(selector, el) {
      return by.selector(selector, el, true);
    },
    selector(selector, el, sanitize) {
      return Array.prototype.slice.call((el || document).querySelectorAll(sanitize
        ? selector
          .replace(/\./g, '\\.')
          .replace(/\[/g, '\\[')
          .replace(/]/g, '\\]')
          .replace(/\$/g, '\\$')
          .replace(/\//g, '\\/')
          .replace(/:/g, '\\:')
        : selector
      ));
    },
  };

  const cls = {
    add(els, cls) {
      if (!Array.isArray(els)) {
        els = [els];
      }
  
      els.forEach((el) => {
        if (typeof el === 'string') {
          el = by.selector(el)[0];
        }
  
        if (!el) {
          return;
        }
  
        const className = el.className.split(' ');
        const classIndex = className.findIndex((e) => e === cls);

        if (classIndex !== -1) {
          return;
        }
  
        className.push(cls);
  
        el.className = className.join(' ').trim();
      });
  
      return cls;
    },
    has(el, cls) {
      if (typeof el === 'string') {
        el = by.selector(el)[0];
      }

      if (!el) {
        return;
      }

      return el.className.split(' ').includes(cls);
    },
    remove(els, cls) {
      if (!Array.isArray(els)) {
        els = [els];
      }
  
      els.forEach((el) => {
        if (typeof el === 'string') {
          el = by.selector(el)[0];
        }
  
        if (!el) {
          return;
        }
  
        const className = el.className.split(' ');
        const classIndex = className.findIndex((e) => e === cls);

        if (classIndex === -1) {
          return;
        }
  
        className.splice(classIndex, 1);
  
        el.className = className.join(' ').trim();
      });
  
      return cls;
    },
    replace(els, clsOld, clsNew) {
      cls.remove(els, clsOld).add(els, clsNew);
  
      return cls;
    }
  };

  const on = {
    change(el, fn) {
      el.onchange = (event) => {
        fn(getValue(event.srcElement), event.srcElement);
      };
  
      return on;
    },
    click(el, fn) {
      el.onclick = (event) => {
        fn(event.srcElement);
      };
  
      return on;
    }
  };

  const api = {
    tabs: {
      init(...tabSelectors) {
        api.tabs.initWithOnChange(_ => _, ...tabSelectors)

        return api;
      },
      initWithOnChange(onChange, ...tabSelectors) {
        if (tabSelectors.length === 0) {
          tabSelectors.push('.tabs');
        }

        tabSelectors.forEach((tabSelector) => {
          by.selector(tabSelector).forEach((tabsEl) => {
            by.selector('.tabs-bar>[data-mini-tabs-id]', tabsEl).forEach((tabsBarEl) => {
              on.click(tabsBarEl, _ => {
                if (!cls.has(tabsBarEl, 'active')) {
                  cls.add(by.selector(`.tabs-content>[data-mini-tabs-id]:not(.hidden)`, tabsEl), 'hidden');
                  cls.remove(by.selector(`.tabs-content>[data-mini-tabs-id="${tabsBarEl.dataset.miniTabsId}"]`, tabsEl), 'hidden');

                  cls.remove(by.selector(`.tabs-bar>[data-mini-tabs-id].active`, tabsEl), 'active');
                  cls.add(by.selector(`.tabs-bar>[data-mini-tabs-id="${tabsBarEl.dataset.miniTabsId}"]`, tabsEl), 'active');

                  onChange(tabsBarEl.dataset.miniTabsId);
                }
              });
            });
          });
        });

        return api;
      },
    },
  };

  return api;
}
