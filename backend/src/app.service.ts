import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
import { exec } from 'child_process';
import { DB_DATABASE, DB_PASSWORD, DB_USER, S3_BUCKET_NAME } from './config/constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Celebration Agency!';
  }


  async backupDatabase(): Promise<void> {
    const backupDir = './backup'; // Directory where backups will be stored
    const maxBackups = 15; // Maximum number of backups to keep
    const dateFormat = 'YYYYMMDD.HHmmss'; // Format for date in backup file name
    const ext = '.sql'; // File extension for backup file

    // Create backup directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    // Get current date and time
    const currentDateTime = moment().format(dateFormat);

    // Generate backup file name
    const backupFileName = `celebration-agencymysql-${currentDateTime}${ext}`;

    // Create backup file path
    const backupFilePath = path.join(backupDir, backupFileName);

    // Run mysqldump command
    const dumpCommand = `mysqldump -u ${DB_USER} -p${DB_PASSWORD} ${DB_DATABASE} > ${backupFilePath}`;
    await promisify(exec)(dumpCommand);

    // Create S3 instance
    const s3 = new AWS.S3();

    // Upload backup file to S3
    const s3Params = {
      Bucket: S3_BUCKET_NAME, // Replace with your S3 bucket name
      Key: backupFileName,
      Body: fs.createReadStream(backupFilePath)
    };
    await s3.upload(s3Params).promise();


    // Delete oldest backup if number of backups exceeds the maximum
    const backups = fs.readdirSync(backupDir);
    if (backups.length > maxBackups) {
      const oldestBackup = backups.sort()[0];
      const oldestBackupPath = path.join(backupDir, oldestBackup);
      fs.unlinkSync(oldestBackupPath);
    }
  }


}

