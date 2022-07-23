// print CKEditor Query Plugin version info
const versionInfo = 'CKEditor Query Plugin Development Version';
console.log(versionInfo);

const registerPlugin = () => {

  // create the adapt plugin
  CKEDITOR.plugins.add('libreTextsAdapt', {
    init(editor) {
      // remove restrictions on what tags and css properties can be output
      editor.filter.allow('div(box-query);p(box-legend);p(mt-script-comment);pre(script)');

      CKEDITOR.dialog.add('libreTextsAdaptDialog', (editor) => {
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
                  label: 'Please enter a valid Adapt ID in the format 123-12345',
                  id: 'adaptID',
                  validate: function() {
                    // see https://github.com/ckeditor/ckeditor4/blob/a786d6f43c17ef90c13b1cf001dbd00204a622b1/plugins/dialog/plugin.js#L3277
                    let value = this && this.getValue ? this.getValue() : arguments[0];
                    if (value.length === 0) return 'adaptID cannot be empty';
                    return CKEDITOR.dialog.validate.regex(/^\d*-\d*$/, "adaptID must be in the proper format")(value);
                  },
                }
              ],
            },
          ],
          onOk() {
            const dialog = this;

            const adaptID = dialog.getValueOf('tab1', 'adaptID');

            editor.insertHtml(`
              <div class="box-query">
              <p class="box-legend"><span>ADAPT \\(\\PageIndex{1}\\)</span></p>

              <p class="mt-script-comment">Embed ADAPT Assessment</p>

              <pre class="script">
              template('adapt/Activity',{'ID':'${adaptID}'});</pre>
              </div>
            `);
          },
        };
      });

      editor.addCommand('openLibretextsAdaptDialog', new CKEDITOR.dialogCommand('libreTextsAdaptDialog'));

      editor.ui.addButton('openLibretextsAdaptDialog', {
        label: 'Insert Adapt',
        command: 'openLibretextsAdaptDialog',
        toolbar: 'insert',
        icon: 'https://cdn.libretexts.net/Icons/adapt.png',
      });
    },
  });

  if (CKEDITOR.config.extraPlugins.length === 0)
    CKEDITOR.config.extraPlugins += 'libreTextsAdapt';
  else
    CKEDITOR.config.extraPlugins += ',libreTextsAdapt';
};

export default registerPlugin;
