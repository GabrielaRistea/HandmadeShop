using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HandmadeShop.Migrations
{
    /// <inheritdoc />
    public partial class editHistoryOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IdUser",
                table: "HistoryOrders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryOrders_IdUser",
                table: "HistoryOrders",
                column: "IdUser");

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryOrders_AspNetUsers_IdUser",
                table: "HistoryOrders",
                column: "IdUser",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistoryOrders_AspNetUsers_IdUser",
                table: "HistoryOrders");

            migrationBuilder.DropIndex(
                name: "IX_HistoryOrders_IdUser",
                table: "HistoryOrders");

            migrationBuilder.DropColumn(
                name: "IdUser",
                table: "HistoryOrders");
        }
    }
}
