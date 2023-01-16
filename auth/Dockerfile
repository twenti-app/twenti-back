#Specify a base image
FROM node:alpine

#Specify a working directory
WORKDIR /usr/auth

#Copy the dependencies file
COPY ./auth/package.json ./

#Install dependencies
RUN npm install

#Copy remaining files
COPY ./keys ../keys
COPY ./auth/ ./
#Default command
CMD ["npm","start"]