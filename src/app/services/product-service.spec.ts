import { ProductService } from './product-service';
import { HttpClient } from '@angular/common/http';

describe('ProductServices', () => {
  it('should create an instance', () => {
    const httpClientMock: HttpClient = {} as HttpClient; // Mock the HttpClient

    const productService = new ProductService(httpClientMock);
    expect(productService).toBeTruthy();
  });
});