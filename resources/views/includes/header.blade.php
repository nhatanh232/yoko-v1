<!--NAVBAR-->
<!--===================================================-->
<?php
$user = \Auth::user();
?>
<header id="navbar">
    <div id="navbar-container" class="boxed">

        <!--Brand logo & name-->
        <!--================================-->
        <div class="navbar-header">
            <a href="{!! route('home') !!}" class="navbar-brand">
                <img src="/nifty/img/logo.png" alt="Nifty Logo" class="brand-icon">
                <div class="brand-title">
                    <span class="brand-text">CMS - YOKO</span>
                </div>
            </a>
        </div>
        <!--================================-->
        <!--End brand logo & name-->


        <!--Navbar Dropdown-->
        <!--================================-->
        <div class="navbar-content clearfix">
            <ul class="nav navbar-top-links pull-left">

                <!--Navigation toogle button-->
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <li class="tgl-menu-btn">
                    <a class="mainnav-toggle" href="#">
                        <i class="demo-pli-view-list"></i>
                    </a>
                </li>
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <!--End Navigation toogle button-->
            </ul>
            <ul class="nav navbar-top-links pull-right">
                <!--User dropdown-->
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <li id="dropdown-user" class="dropdown">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle text-right">
                        <span class="pull-right">
                            <img class="img-circle img-user media-object" onerror="this.src='/images/user.png';"
                                 src="" alt="">
                        </span>
                        <div class="username hidden-xs">{{ @$user['name'] }}</div>
                    </a>

                    <div class="dropdown-menu dropdown-menu-md dropdown-menu-right panel-default">

                        <!-- Dropdown heading  -->
                        <div class="pad-all bord-btm">
                            <p class="text-main mar-btm">Xin chào, {{ @$user['name'] }}</p>
                        </div>

                        <!-- User dropdown menu -->
                        <ul class="head-list">
                            <li>
                                <a href="#">
                                    <i class="demo-pli-male icon-lg icon-fw"></i> Thông tin của bạn
                                </a>
                            </li>
                        </ul>

                        <!-- Dropdown footer -->
                        <div class="pad-all text-right">
                            <a href="{!! route('logout') !!}" class="btn btn-primary btn-rounded"
                               onclick="event.preventDefault();
                               document.getElementById('logout-form').submit();">
                                <i class="demo-pli-unlock"></i> Thoát
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                @csrf
                            </form>
                        </div>
                    </div>
                </li>
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <!--End user dropdown-->
            </ul>
        </div>
        <!--================================-->
        <!--End Navbar Dropdown-->

    </div>
</header>
<!--===================================================-->
<!--END NAVBAR-->
