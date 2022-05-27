FROM node:16
RUN npm install -g nodemon
RUN NODE_OPTIONS="--max-old-space-size=8192"

ENV GENERATE_SOURCEMAP: false
CMD ["node", "index.js"]