import {HttpErrorResponse} from '@angular/common/http';

export class RepositoryUtils {
  public static getNetworkErrorMessage(error: HttpErrorResponse): string {
    return (error.error && error.error.message) || error.message;
  }
}
