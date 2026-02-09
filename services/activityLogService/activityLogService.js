const ActivityLogs = require("../../server/models/ActivityLogModel");
const Users = require("../../server/models/UserModel");

class ActivityLogService {
    
    static async logActivity(userId, actionType, category, description, entityName = null, entityId = null) {
        try {
            const [user] = await Users.getById(userId);
            
            if (!user) {
                console.error("User not found for activity logging");
                return null;
            }

            // Get initials from name
            const initials = this.getInitials(user.fullName || user.email);

            const activityData = {
                userId,
                userName: user.fullName || user.email,
                userAvatar: initials,
                actionType,
                category,
                description,
                entityName,
                entityId
            };

            const result = await ActivityLogs.save(activityData);
            return result;
        } catch (error) {
            console.error("Error logging activity:", error);
            return null;
        }
    }

    static getInitials(name) {
        if (!name) return "XX";
        const words = name.trim().split(/\s+/);
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }

    static async getRecentActivities(limit = 5) {
        try {
            const activities = await ActivityLogs.get();
            
            if (!activities) {
                return [];
            }

            // Sort by timestamp descending and limit results
            return activities
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, limit)
                .map(activity => ({
                    ...activity,
                    timeAgo: this.getTimeAgo(activity.timestamp)
                }));
        } catch (error) {
            console.error("Error fetching activities:", error);
            return [];
        }
    }

    static getTimeAgo(timestamp) {
        const now = new Date();
        const activityTime = new Date(timestamp);
        const seconds = Math.floor((now - activityTime) / 1000);

        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
        const months = Math.floor(days / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }
}

module.exports = ActivityLogService;