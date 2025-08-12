import statusService from '../services/status.service.js';
class StatusController {
    async getStatus(request, reply) {
        const data = statusService.getStatus();
        return reply.send(data);
    }
}
export default new StatusController();
//# sourceMappingURL=status.controller.js.map
