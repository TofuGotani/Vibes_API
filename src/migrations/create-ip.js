module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("IPs", {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
        ip: {
          type: Sequelize.STRING,
          unique: true,
        },
        access_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        last_access_time: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("IPs");
    },
  };
  