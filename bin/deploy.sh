HOME_DIR=/home/jupyterteam
BRANCH=$(git branch --show-current)
ESCAPED_BRANCH=$(printf '%s\n' "$BRANCH" | sed -e 's/[\/&]/\\&/g')
HASH=$(git rev-parse --short HEAD)

if [ $# -eq 1 ]
then
  BRANCH=$1
fi

ssh -tt jupyterteam@test.libretexts.org << EOF
cd $HOME_DIR/ckeditor-query-plugin
git fetch --all
git checkout $BRANCH && git reset --hard origin/$BRANCH
sed -i "s/Development Version/Development Version - $ESCAPED_BRANCH - $HASH/" src/scripts/plugin.js
yarn install
yarn build
cp dist/queryPlugin.min.js $HOME_DIR/public
exit
EOF
