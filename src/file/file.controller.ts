import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        cb(
          new BadRequestException(
            'Uploaded file can only be JPEG or PNG',
          ),
          false,
        );
      }
      cb(null, true);
    }
  }),)
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1000 }), // 1MB
        ],
        exceptionFactory: () => {
          return new BadRequestException('Invalid request', {
            cause: [
              {
                property: 'file',
                constraints: {
                  message:
                    'Uploaded file can only be JPEG or PNG and must be less than 1MB',
                },
              },
            ],
          });
        },
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      filename: file.filename,
    };
  }
}
