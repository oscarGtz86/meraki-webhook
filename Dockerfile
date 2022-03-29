###################################################################
#                                                                 #
# Dockerfile to start Webhook Server                              #
# Author: Oscar Escamilla                                         #
# Date: 04.02.2022                                                #
# Node.js 14                                                      #
# Version: 1.0                                                    #
#                                                                 #
###################################################################

FROM node:14

# Work directory
WORKDIR /home/node

# Copy package.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy code
COPY . .

# Expose port
EXPOSE 8080

# Add permissions to entrypoint
RUN chmod +x entrypoint.sh

# Get params
ENTRYPOINT ["./entrypoint.sh"]

# Run aplication
CMD ["npm", "start"]