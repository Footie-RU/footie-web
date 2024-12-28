import { Order, OrderStatus } from 'src/app/core/interfaces/order.interface';

export class OrdersHelpers {
  // Display the order status in a human-readable format
  getOrderStatus(status: OrderStatus): string {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'Accepted':
        return 'Accepted';
      case 'InProgress':
        return 'In Transit';
      case 'Delivered':
        return 'Delivered';
      case 'Cancelled':
        return 'Cancelled';
      case 'Failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  }

  // Get the order status color based on the status
  getOrderStatusColor(status: OrderStatus): string {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'Accepted':
        return 'green';
      case 'InProgress':
        return 'green';
      case 'Delivered':
        return 'green';
      case 'Cancelled':
        return 'red';
      case 'Failed':
        return 'red';
      default:
        return 'gray';
    }
  }

  // Display the order delivery mode icon based on the delivery mode
  getDeliveryModeIcon(deliveryMode: string): string {
    switch (deliveryMode) {
      case 'feet':
        return 'assets/images/icons/feet-mode.svg';
      case 'bike':
        return 'assets/images/icons/bike-mode.svg';
      case 'car':
        return 'assets/images/icons/car-mode.svg';
      case 'van':
        return 'assets/images/icons/van-mode.svg';
      case 'truck':
        return 'assets/images/icons/truck-mode.svg';
      default:
        return 'assets/images/icons/feet-mode.svg';
    }
  }

  getEstimatedDeliveryTime(order: Order): string {
    const currentTime = new Date().getTime();

    if (order.status === 'Accepted') {
      return 'Awaiting pickup';
    } else if (order.status === 'InProgress') {
      // Calculate the time left for delivery
      const estimatedDeliveryTime = new Date(
        order.estimatedDeliveryTime as Date
      ).getTime();
      const timeLeft = estimatedDeliveryTime - currentTime;
      const minutesLeft = Math.floor(timeLeft / 60000);

      return minutesLeft > 0
        ? `Time left: ${minutesLeft} minutes`
        : `Delivery should have been completed`;
    } else if (order.status === 'Delivered') {
      return `Order completed`;
    } else if (order.status === 'Cancelled') {
      return `Order was cancelled`;
    } else if (order.status === 'Failed') {
      return `Order failed`;
    } else {
      // Calculate the time since the order was placed
      // Get the order creation time in UTC
      const createdAt = new Date(order.createdAt).getTime() - 3600000;
      const timePassed = Math.abs(currentTime - createdAt);

      // Convert time passed into minutes, hours, days, or months
      const minutesPassed = Math.floor(timePassed / 60000);
      const hoursPassed = Math.floor(timePassed / 3600000);
      const daysPassed = Math.floor(timePassed / (3600000 * 24));
      const monthsPassed = Math.floor(timePassed / (3600000 * 24 * 30));

      if (minutesPassed < 60) {
        return `Order placed: ${minutesPassed} ${minutesPassed > 1 ? 'minutes' : 'minute'} ago`;
      } else if (hoursPassed < 24) {
        return `Order placed: ${hoursPassed} ${hoursPassed > 1 ? 'hours' : 'hour'} ago`;
      } else if (daysPassed < 30) {
        return `Order placed: ${daysPassed} ${daysPassed > 1 ? 'days' : 'day'} ago`;
      } else {
        return `Order placed: ${monthsPassed} ${monthsPassed > 1 ? 'months' : 'month'} ago`;
      }
    }
  }

  // Get the order location icon based on the location type
  getLocationIcon(locationType: string): string {
    // use bootstrap icons for location types
    switch (locationType) {
      case 'mall':
        return 'bi bi-shop';
      case 'office':
        return 'bi bi-briefcase';
      case 'home':
        return 'bi bi-house';
      case 'airport':
        return 'bi bi-airplane';
      case 'hospital':
        return 'bi bi-hospital';
      case 'school':
        return 'bi bi-book';
      case 'restaurant':
        return 'bi bi-egg-fried';
      case 'hotel':
        return 'bi bi-building-fill-check';
      case 'others':
        return 'bi bi-geo-alt';
      default:
        return 'bi bi-clock';
    }
  }
}

// Helper function to recursively append properties to FormData
export function appendToFormData(
  formData: FormData,
  data: any,
  parentKey: string = ''
) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      // If the value is an object, recursively append its properties
      if (typeof value === 'object' && value !== null) {
        appendToFormData(formData, value, fullKey);
      } else {
        // If the value is a Blob (image), handle it accordingly
        if (value instanceof Blob) {
          const fileName = `${key}.jpg`; // Generate a file name (or use any other strategy)
          const file = convertBlobToFile(value, fileName);
          formData.append(fullKey, file);
        } else {
          formData.append(fullKey, value);
        }
      }
    }
  }
}

// Assuming you are working with a blob URL and need to convert it to a File
export function convertBlobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
}

export function fetchBlobFromUrl(url: string): Promise<Blob> {
  return fetch(url)
    .then((response) => response.blob())
    .catch((error) => {
      console.error('Failed to fetch blob from URL:', error);
      throw error;
    });
}


export function base64ToBlob(base64: string, contentType = 'image/jpeg'): Blob {
  const byteCharacters = atob(base64.split(',')[1]); // Remove `data:image/...;base64,`
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length).fill(0).map((_, i) => slice.charCodeAt(i));
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  return new Blob(byteArrays, { type: contentType });
}
