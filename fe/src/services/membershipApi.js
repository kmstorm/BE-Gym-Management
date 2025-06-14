import { API_BASE } from './config';
import { fetchWithAuth } from './api';

// Helper function to get auth headers - can be removed if fetchWithAuth handles it fully
// const getAuthHeaders = () => {
//     const token = localStorage.getItem('gym_token');
//     return {
//         'Content-Type': 'application/json',
//         'Authorization': token ? `Bearer ${token}` : ''
//     };
// };

// Lấy danh sách gói tập
export async function getPackages() {
    try {
        // Assuming fetchWithAuth now correctly parses JSON and throws on HTTP error
        const response = await fetchWithAuth(`${API_BASE}/api/packages`);
        // If fetchWithAuth returns data directly on success:
        return { success: true, data: response.data || response }; // Adjust based on fetchWithAuth actual return
    } catch (error) {
        console.error('getPackages error in membershipApi:', error);
        return { success: false, message: error.message || 'Lấy danh sách gói tập thất bại', data: [] };
    }
}

// Lấy gói tập đang active của user
export async function getActiveMembership(userId) {
    if (!userId) {
        return { success: false, message: 'User ID is required' };
    }
    try {
        const response = await fetchWithAuth(`${API_BASE}/api/memberships/active/${userId}`);
        return { success: true, ...response }; // Assumes response is already structured or just data
    } catch (error) {
        console.error('getActiveMembership error:', error);
        return { success: false, message: error.message || 'Lấy thông tin gói tập thất bại' };
    }
}

// Lấy lịch sử gói tập của user
export async function getMembershipHistory(userId) {
    if (!userId) {
        return { success: false, message: 'User ID is required' };
    }
    try {
        const response = await fetchWithAuth(`${API_BASE}/api/memberships/user/${userId}`);
        return { success: true, ...response }; 
    } catch (error) {
        console.error('getMembershipHistory error:', error);
        return { success: false, message: error.message || 'Lấy lịch sử gói tập thất bại' };
    }
}

// Đăng ký gói tập mới
export async function registerMembership(data) {
    if (!data.userId || !data.packageId) {
        return { success: false, message: 'User ID and Package ID are required (client-side check).' };
    }
    try {
        // fetchWithAuth will throw an error if !res.ok, and the error will have a message
        // from the parsed JSON if possible (due to recent api.js changes).
        const responseData = await fetchWithAuth(`${API_BASE}/api/membership/`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        // If fetchWithAuth was successful, responseData is the parsed JSON body.
        // We assume a successful response from this specific endpoint implies success.
        return { success: true, ...responseData }; 
    } catch (error) {
        console.error('registerMembership error in membershipApi:', error);
        // The error.message should be relatively informative now thanks to fetchWithAuth updates.
        return { success: false, message: error.message || 'Đăng ký gói tập thất bại do lỗi không xác định.' };
    }
}

// Gia hạn gói tập
export async function renewMembership(membershipId) {
    if (!membershipId) {
        return { success: false, message: 'Membership ID is required' };
    }
    try {
        const response = await fetchWithAuth(`${API_BASE}/api/memberships/${membershipId}/renew`, {
            method: 'POST'
        });
        return { success: true, ...response };
    } catch (error) {
        console.error('renewMembership error:', error);
        return { success: false, message: error.message || 'Gia hạn gói tập thất bại' };
    }
}

// Hủy gói tập
export async function cancelMembership(membershipId) {
    if (!membershipId) {
        return { success: false, message: 'Membership ID is required' };
    }
    try {
        const response = await fetchWithAuth(`${API_BASE}/api/memberships/${membershipId}/cancel`, {
            method: 'POST'
        });
        return { success: true, ...response };
    } catch (error) {
        console.error('cancelMembership error:', error);
        return { success: false, message: error.message || 'Hủy gói tập thất bại' };
    }
}

// Function to get all memberships (for admin display)
export async function getAllMemberships() {
    try {
        const response = await fetchWithAuth(`${API_BASE}/api/membership/all`); // Đúng endpoint backend
        return { success: true, data: response.data || response };
    } catch (error) {
        console.error('getAllMemberships error:', error);
        return { success: false, message: error.message || 'Không thể tải danh sách đăng ký thành viên.', data: [] };
    }
}

export async function updatePaymentStatus(id, paymentStatus) {
    try {
        const response = await fetchWithAuth(`${API_BASE}/api/membership/${id}/payment-status`, {
            method: 'PATCH',
            body: JSON.stringify({ paymentStatus })
        });
        return response;
    } catch (error) {
        console.error('updatePaymentStatus error:', error);
        return { success: false, message: error.message || 'Cập nhật trạng thái thanh toán thất bại.' };
    }
} 