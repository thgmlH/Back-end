<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" import="java.sql.*" import="java.util.*"%>
<%!
String driver = "com.mysql.jdbc.Driver";
String DB_URL = "jdbc:mysql://localhost:3306/JSPDB";
String DB_USER = "root";
String DB_PASSWORD = "llhy18";
Connection conn = null;
Statement stmt;
ResultSet rs;
%>
        <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=0.9">
                <link href="style.css" rel="stylesheet" type="text/css">
                <link href="search.css" rel="stylesheet" type="text/css">
                <link href="category1.css" rel="stylesheet" type="text/css">
                <title>ALL Q</title>
                <style>
#pin {
        position : absolute;
}
        </style>
        </head>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9">
        </script>
        <body bgcolor="#fbfef5">
                <form name="frm">
                        <%
                        List<Integer> x = new ArrayList<Integer>();
                        List<Integer> y = new ArrayList<Integer>();
                        %>
                        <%
                        String category = request.getParameter("category");
                        String brand = request.getParameter("brand");

                        if(brand != null)
                                brand = brand.replaceAll(" ","");

                        try{
                        String query0 = "SELECT * FROM Product WHERE Category LIKE '%" + category + "%' AND (Brand LIKE '%" + brand + "%' OR Name LIKE '%" + brand + "%')";
                        String query1 = "SELECT * FROM Product WHERE (Brand LIKE '%" + brand + "%' OR Name LIKE '%" + brand + "%')";

                        Class.forName(driver);
                        conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                        stmt = conn.createStatement();
                        if(category == null)
                                rs = stmt.executeQuery(query1);
                        if(category != null){
                                rs = stmt.executeQuery(query0);
                                category = category.replaceAll(" ","");
                        }


                        while(rs.next()){
                                x.add(rs.getInt(4));
                                y.add(rs.getInt(5));
                        }
                        if(category == null && brand == null){%>

                                <script>
                                        Swal.fire({
                                                title: "올리브영",
                                                text: "한성대입구역점입니다.",
                                                icon: "info"
                                        });
                                </script>
                        <%}
                        if(x.size() == 0 && y.size() == 0 && brand != null){%>
                                <script>
                                        Swal.fire({
                                                title:"경고",
                                                text: "해당 결과 없음",
                                                icon: "error"
                                        });
                                </script>
                        <%}
                        } catch(Exception e){
                                e.printStackTrace();
                        }
                        finally{

                                try{
                                        if(rs != null) rs.close();
                                        if(stmt != null) stmt.close();
                                        if(conn != null) conn.close();
                        }catch(Exception e2){
                                e2.printStackTrace();
                                }
                        }
                        %>
                                <img src="image/logo.png" style="margin-left: auto; margin-right: auto; display: block; width: 200px; height: 80px;"><br>
                                <div include = "form-input-select()">
                                <select id="category" name="category" style="width:405px; transform:translate(3px,-3px);">
                                                        <option value="" selected disabled hidden >카테고리</option>
                                                        <option value="Eye">Eye</option>
                                                        <option value="Lip">Lip</option>
                                                        <option value="Base">Base</option>
                                                        <option value="Body">Body</option>
                                                        <option value="Hair">Hair</option>
                                                        <option value="Make Up">Make Up</option>
                                                        <option value="Pad/Mask">Pad/Mask</option>
                                                        <option value="Cleansing">Cleansing</option>
                                                        <option value="Hand Cream">Hand Cream</option>
                                                        <option value="Facial Care">Facial Care</option>
                                                        <option value="Men''s Care">Men's Care</option>
                                                        <option value="Dental Care">Dental Care</option>
                                                        <option value="Health Care">Health Care</option>
                                                        <option value="Beauty Tools">Beauty Tools</option>
                                                        <option value="Snack">Snack</option>
                                                        <option value="향수">향수</option>
                                                        <option value="생리대">생리대</option>
                                                        <option value="피부건강">피부건강</option>
                                                </select>
                                        </div>
                                        <table>
                                                <tr>
                                                <td style="line-height:0.1;">
                                                        <label for="brand" class="brand">
                                                                <input type="text" id="brand" name="brand" placeholder="&nbsp;" style="width:330px;">
                                                                        <span class="label">브랜드나 상품명을 입력하세요.</span>
                                                                <svg width="120px" height="26px" viewBox="0 0 120 26">
                                                                        <path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
                                                                </svg>
                                                                <span class="border"></span>
                                                        </label>
                                                </td>
                                                        <a class="dribbble" href="https://dribbble.com/shots/4836189-Input" target="_blank">
                                                        <span class="fa fa-dribbble"></span></a>

                                                <td>
                                                        <button type="button" style="width:70px;" onclick="alert();">검색</button>
                                                </td>

                                <tr>
                                        <td class="cell"></td>
                                </tr>

                                <tr>
                                        <td id="add" colspan="3"><img src="image\floor_plan2.png" alt="도면">
                                                        <img id="pin">
                                                                <script>

                                                                      function alert(){
                                                                                var brand = document.getElementById("brand").value;
                                                                                var category = document.getElementById("category").value;
        
                                                                                if(brand == "" && category != ""){
                                                                                        Swal.fire({
                                                                                                title: "검색결과",
                                                                                                text: "Category: "+category,
                                                                                                icon: "success",
                                                                                                closeOnClickOutside: false,
                                                                                                showCancleButton: true,
                                                                                                confirmButtonText: "확인",
                                                                                                confirmButtonColor: "#6699FF"
                                                                                        }).then((result) =>{
                                                                                                if(result.isConfirmed)                                        
                                                                                                        document.frm.submit();                                
                                                                                        });                               
                                                                                }
                                                                                
                                                                                else if(brand != "" && category == ""){
                                                                                        Swal.fire({
                                                                                                title: "검색결과",
                                                                                                text: "브랜드 및 상품: "+brand,
                                                                                                icon: "success",
                                                                                                closeOnClickOutside: false,
                                                                                                showCancleButton: true,
                                                                                                confirmButtonText: "확인",
                                                                                                confirmButtonColor: "#6699FF"
                                                                                        }).then((result) =>{
                                                                                                if(result.isConfirmed)
                                                                                                        document.frm.submit();
                                                                                        });
                                                                                }

                                                                                else if(brand != "" && category != ""){
                                                                                        Swal.fire({
                                                                                                title: "검색결과",
                                                                                                text: category+", "+brand+"의 검색결과입니다.",
                                                                                                icon: "success",
                                                                                                closeOnClickOutside: false,
                                                                                                showCancleButton: true,
                                                                                                confirmButtonText: "확인",
                                                                                                confirmButtonColor: "#6699FF"
                                                                                        }).then((result) =>{
                                                                                                if(result.isConfirmed)
                                                                                                        document.frm.submit();
                                                                                        });
                                                                                }
                                                                                
                                                                                else{
                                                                                         Swal.fire({
                                                                                                title:"경고",
                                                                                                text: "검색어를 입력하세요.",
                                                                                                icon: "error",
                                                                                                confirmButtonColor: "#6699FF",
                                                                                                closeOnClickOutside: false
                                                                                         }).then((result) =>{
                                                                                                if(result.isConfirmed)
                                                                                                        document.frm.submit();
                                                                                         });
                                                                                }

                                                                      }
                                                                        
                                                                      var x = <%= x%>;
                                                                      var y = <%= y%>;

                                                                      var pin;
                                                                      var img;
                                                                      var id = "pin";
                                                                      var i=0;

                                                                      while(i < x.length){                       
                                                                                pin = document.getElementById(id);

                                                                                if(x[270] == 0 && y[270] == 0){
                                                                                        pin.style.display = "none";
                                                                                }
                                                                                else{
                                                                                        pin.setAttribute("src", "image/marker.png");
                                                                                        pin.style.left = x[i] + 'px';
                                                                                        pin.style.top = y[i] + 'px';
                                                                                        img = document.createElement("img");
                                                                                        img.style.position = "absolute";
                                                                                        if(i != x.length-1)
                                                                                                document.getElementById("add").append(img);
                                                                                        else
                                                                                                break;
                                                                                }       
                                                                                i++;
                                                                                id = "pin" + i;
                                                                                img.setAttribute("id", id);
                                                                        }
                                                </script>
                                        </td>
                                </tr>
                        </table>
                </form>
        </body>
</html>
