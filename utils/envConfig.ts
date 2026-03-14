import dotenv from 'dotenv';

dotenv.config();

const VARIABLES_REQUERIDAS = [
  'BASE_URL',
  //'API_BASE_URL',
  //'USER_EMAIL',
  //'USER_PASSWORD',
  //'ADMIN_EMAIL',
  //'ADMIN_PASSWORD',
] as const;

type EnvVar = (typeof VARIABLES_REQUERIDAS)[number];

function getEnvVar(name: EnvVar): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable de entorno requerida no encontrada: "${name}"`);
  }
  return value;
}

export const config = {
  baseUrl: getEnvVar('BASE_URL'),
  //apiBaseUrl: getEnvVar('API_BASE_URL'),
  //userEmail: getEnvVar('USER_EMAIL'),
  //userPassword: getEnvVar('USER_PASSWORD'),
  //adminEmail: getEnvVar('ADMIN_EMAIL'),
  //adminPassword: getEnvVar('ADMIN_PASSWORD'),
};
