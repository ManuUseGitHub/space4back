YELLOW="\033[1;33m"
NC="\033[0m"
CHECK="${GREEN}✔${NC}"

# (-q : quietely) clear &&
echo decompress the archive $1 containing the built web app

start_time=$(date +%s)
unzip -q $1
end_time=$(date +%s)

duration=$((end_time - start_time))
echo -ne "\r${CHECK} Extraction complete in ${YELLOW}${duration}s${NC}                 \n"

echo ensure the output directory is deleted
rm -rf ./output
echo moving everithing from the dist directory out in the current directory
mv -f dist/* .
echo delete the dist and .output directories
rm -rf dist
rm -rf .output
echo "┌─────────────────────────────────────────┐"
echo "|                finish                   |"
echo "└─────────────────────────────────────────┘"