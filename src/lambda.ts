import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import app, { connectToDB } from './app';

let serverlessExpressInstance: any;

const setup = async (event: APIGatewayEvent, context: Context) => {
  const result = await connectToDB();
  console.log(result);
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
};

export const handler = (event: APIGatewayEvent, context: Context) => {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
};
