import db from "../models/index.js";
import serverMessage from "../utils/serverMessage.js";

// Create a new lead
const leadsController = {
  register: async (req, res) => {
    try {
      const { first_name, email, phone, budget, financing_type, language } =
        req.body;

      if (!first_name || !email || !phone || !budget || !financing_type) {
        return serverMessage(res, "UNAUTHORIZED_ACCESS");
      }

      // Vérifier si le user existe et si c'est, lui renvoyer un message
      const user = await db.leads.findOne({ where: { email } });
      if (user) {
        serverMessage(res, "ACCOUNT_ALREADY_EXISTS");
        return;
      }

      // Créer le lead lié à l'utilisateur
      const lead = await db.leads.create({
        first_name,
        email,
        phone,
        budget,
        financing_type,
        language,
      });
      const { accessToken, refreshToken } = lead.generateTokens();
      const data = {
        id: lead.id,
        first_name: lead.first_name,
        email: lead.email,
        phone: lead.phone,
        budget: lead.budget,
        car_type: lead.car_type,
        financing_type: lead.financing_type,
        car_brand_id: lead.car_brand_id,
        car_model_id: lead.car_model_id,
        source: lead.source,
        language: lead.language,
        accessToken,
        refreshToken,
      };

      serverMessage(res, "SUCCESS", data);
    } catch (error) {
      console.error("Create lead error:", error);
      serverMessage(res);
    }
  },

  // Get current lead

  getMe: async (req, res) => {
    try {
      const lead = req.lead;

      const data = {
        id: lead.id,
        first_name: lead.first_name,
        email: lead.email,
        phone: lead.phone,
        budget: lead.budget,
        car_type: lead.car_type,
        financing_type: lead.financing_type,
        car_brand_id: lead.car_brand_id,
        car_model_id: lead.car_model_id,
        source: lead.source,
        language: lead.language,
      };

      return serverMessage(res, "SUCCESS", data);
    } catch (error) {
      return serverMessage(res);
    }
  },

  refresh: async (req, res) => {
    try {
      // const token = req.cookies.refreshToken;
      const token = req.body.refreshToken;

      if (!token) return serverMessage(res, "UNAUTHORIZED_ACCESS");
      // Vérifier et extraire userId
      const payload = await db.leads.verifyToken(token, db);

      // if (!payload || session.expires_at < new Date()) {
      //   return serverMessage(res, "TOKEN_EXPIRED");
      // }
      // Générer un nouvel accessToken
      const accessToken = generateAccessToken({ id: payload.id });
      // (Optionnel) rotation : générer aussi un nouveau refresh, mettre à jour la session et le cookie
      return serverMessage(res, "SUCCES", { token: accessToken });
    } catch (err) {
      return serverMessage(res, "TOKEN_INVALID");
    }
  },
  // getMe: async (req, res) => {
  //   try {
  //     const aspk = req.params.aspk;

  //     const lead = await db.leads.findOne({ where: { token: aspk } });
  //     const { accessToken, refreshToken } = lead.generateTokens();

  //     const data = {
  //       id: lead.id,
  //       first_name: lead.first_name,
  //       email: lead.email,
  //       phone: lead.phone,
  //       budget: lead.budget,
  //       car_type: lead.car_type,
  //       financing_type: lead.financing_type,
  //       car_brand_id: lead.car_brand_id,
  //       car_model_id: lead.car_model_id,
  //       source: lead.source,
  //       language: lead.language,
  //       accessToken: `aspk_${accessToken}`,
  //       refreshToken: `rspk_${refreshToken}`,
  //     };

  //     return serverMessage(res, "SUCCESS", data);
  //   } catch (error) {
  //     serverMessage(res);
  //   }
  // },
  // Get all leads (admin only)
  getAllLead: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        car_type,
        sortBy = "createdAt",
        sortOrder = "DESC",
      } = req.query;

      const offset = (page - 1) * limit;

      // Build query conditions
      const whereConditions = {};

      if (status) {
        whereConditions.status = status;
      }

      if (carType) {
        whereConditions.car_type = car_type;
      }

      // Get leads with pagination
      const { count, rows: leads } = await db.leads.findAndCountAll({
        where: whereConditions,
        limit: parseInt(limit),
        offset: offset,
        order: [[sortBy, sortOrder]],
        include: [
          { model: CarBrand, as: "brand" },
          { model: CarModel, as: "model" },
        ],
      });

      res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        leads,
      });
    } catch (error) {
      console.error("Get leads error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Get lead by ID (admin only)
  getLeadById: async (req, res) => {
    try {
      const lead = await db.leads.findByPk(req.params.id, {
        include: [
          { model: CarBrand, as: "brand" },
          { model: CarModel, as: "model" },
        ],
      });

      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }

      res.status(200).json(lead);
    } catch (error) {
      console.error("Get lead error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default leadsController;
