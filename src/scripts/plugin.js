const registerPlugin = () => {
  CKEDITOR.plugins.add('libreTextsQuery', {
    init(editor) {
      // remove restrictions on what tags and css properties can be output
      editor.filter.allow('div(box-query);p(box-legend);p(mt-script-comment);pre(script)');

      CKEDITOR.dialog.add('libreTextsQueryDialog', (editor) => {
        return {
          title: 'LibreTexts Query Plugin',
          resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
          minWidth: 500,
          minHeight: 400,
          contents: [
            {
              id: 'tab1',
              label: 'First Tab',
              title: 'First Tab Title',
              accessKey: 'Q',
              elements: [
                {
                  type: 'text',
                  label: 'Please enter a valid page ID',
                  id: 'pageId',
                  validate: function() {
                    // see https://github.com/ckeditor/ckeditor4/blob/a786d6f43c17ef90c13b1cf001dbd00204a622b1/plugins/dialog/plugin.js#L3277
                    let value = this && this.getValue ? this.getValue() : arguments[0];
                    if (value.length === 0) return 'pageID cannot be empty';
                    return CKEDITOR.dialog.validate.number("PageID must by a number")(value);
                  },
                }
              ],
            },
          ],
          onOk() {
            const dialog = this;

            const pageId = parseInt(dialog.getValueOf('tab1', 'pageId'));

            editor.insertHtml(`
              <div class="box-query">
                <p class="box-legend"><span>Query \\(\\PageIndex{1}\\)</span></p>

                <p class="mt-script-comment">Embed QUERY Assessment</p>
                <pre class="script">template('query',{'PageID':'${pageId}'});</pre>
              </div>
            `);
          },
        };
      });

      editor.addCommand('openLibretextsQueryDialog', new CKEDITOR.dialogCommand('libreTextsQueryDialog'));

      editor.ui.addButton('openLibretextsQueryDialog', {
        label: 'Insert Query',
        command: 'openLibretextsQueryDialog',
        toolbar: 'insert',
        icon: 'https://a.mtstatic.com/@public/production/site_4538/1579208579-favicon.ico',
      });
    },
  });

  CKEDITOR.plugins.add('libretextsAdapt', {
    init(editor) {
      // remove restrictions on what tags and css properties can be output
      editor.filter.allow('div(box-query);p(box-legend);p(mt-script-comment);pre(script)');

      CKEDITOR.dialog.add('libretextsAdaptDialog', (editor) => {
        return {
          title: 'Libretexts Adapt Plugin',
          resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
          minWidth: 500,
          minHeight: 400,
          contents: [
            {
              id: 'tab1',
              label: 'First Tab',
              title: 'First Tab Title',
              accessKey: 'Q',
              elements: [
                {
                  type: 'text',
                  label: 'Please enter a valid Adapt ID',
                  id: 'adaptID',
                  validate: function() {
                    // see https://github.com/ckeditor/ckeditor4/blob/a786d6f43c17ef90c13b1cf001dbd00204a622b1/plugins/dialog/plugin.js#L3277
                    let value = this && this.getValue ? this.getValue() : arguments[0];
                    if (value.length === 0) return 'adaptID cannot be empty';
                    return CKEDITOR.dialog.validate.number("adaptID must by a number")(value);
                  },
                }
              ],
            },
          ],
          onOk() {
            const dialog = this;

            const adaptID = parseInt(dialog.getValueOf('tab1', 'adaptID'));

            editor.insertHtml(`
              <div class="box-query">
              <p class="box-legend"><span>ADAPT \\(\\PageIndex{1}\\)</span></p>

              <p class="mt-script-comment">adapt embed code: '${adaptID}'</p>

              <pre class="script">
              template('adapt/Activity',{'ID':'${adaptID}'});</pre>
              </div>
            `);
          },
        };
      });

      editor.addCommand('openLibretextsAdaptDialog', new CKEDITOR.dialogCommand('libretextsAdaptDialog'));

      editor.ui.addButton('openLibretextsAdaptDialog', {
        label: 'Insert Adapt',
        command: 'openLibretextsAdaptDialog',
        toolbar: 'insert',
        icon: 'https://adapt.libretexts.org/favicon.ico',
      });
    },
  });

  if (CKEDITOR.config.extraPlugins.length === 0)
    CKEDITOR.config.extraPlugins += 'libreTextsQuery,libretextsAdapt';
  else
    CKEDITOR.config.extraPlugins += ',libreTextsQuery,libretextsAdapt';
};

export default registerPlugin;

