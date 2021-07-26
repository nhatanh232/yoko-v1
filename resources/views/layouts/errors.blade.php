<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<?php
$ver_js = \App\Helpers\General::get_version_js();
$ver_css = \App\Helpers\General::get_version_css();
$ac = \App\Helpers\General::get_controller_action();
?>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>
        @if (isset($title))
            Quản lý {{ucfirst($title)}} - FPT Telecom
        @else
            @yield('title', 'Admin'){{' :: '.config('app.name')}}
        @endif
    </title>
    <!--STYLESHEET-->
    <!--Open Sans Font [ OPTIONAL ]-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
    <!--Bootstrap Stylesheet [ REQUIRED ]-->
    <link href="/nifty/css/bootstrap.min.css?v=1" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/nifty/plugins/font-awesome/css/font-awesome.min.css?v=1">
    <!--Nifty Stylesheet [ REQUIRED ]-->
    <link href="/nifty/css/nifty.min.css" rel="stylesheet">
    <!--Nifty Premium Icon [ DEMONSTRATION ]-->
    <link href="/nifty/css/demo/nifty-demo-icons.min.css" rel="stylesheet">
    <!--JAVASCRIPT-->
    <!--Select2 [ OPTIONAL ]-->
    <link href="/nifty/plugins/select2/css/select2.min.css" rel="stylesheet">

    {{--<link href="{{ asset('vendor/select2/select2.css') }}" rel="stylesheet" type="text/css" />--}}
    {{--<link href="{{ asset('vendor/select2/select2-bootstrap-dick.css') }}" rel="stylesheet" type="text/css" />--}}

    <!-- pnotify -->
    <link rel="stylesheet" href="{{ asset('/assets/plugins/pnotify/pnotify.custom.min.css') }}">
    <!--Switchery [ OPTIONAL ]-->
    <link href="/nifty/plugins/switchery/switchery.min.css" rel="stylesheet">
    <!-- bootstrap datepicker -->
    <link rel="stylesheet" href="{{ asset('/nifty/plugins/bootstrap-datepicker/bootstrap-datepicker.min.css') }}">

    <link href="{{ asset('/nifty/plugins/bootstrap-select/bootstrap-select.min.css') }}" rel="stylesheet">

    <!--Pace - Page Load Progress Par [OPTIONAL]-->
    <link href="/nifty/plugins/pace/pace.min.css" rel="stylesheet">

    @yield('before_styles')

    <link rel="stylesheet" href="{{ asset('css/customs-admin.css?v='.$ver_css) }}">

@yield('after_styles')

<!-- Favicons -->
    <link rel="#" type="image/x-icon" sizes="16x16">

    <script type="text/javascript">
        var _base_url = '{{url('/')}}';
    </script>
</head>
<!--TIPS-->
<!--You may remove all ID or Class names which contain "demo-", they are only used for demonstration. -->
<body>
<div id="container" class="effect aside-float aside-bright mainnav-lg navbar-fixed">

    @include('includes.header')

    <div class="boxed">

        <!--CONTENT CONTAINER-->
        <!--===================================================-->
        <div id="content-container">
            <!--Page Title-->
            <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
            <div id="page-title">
                <h1 class="page-header text-overflow">{{ @$title }}</h1>
            </div>
            <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
            <!--End page title-->

            <!--Page content-->
            @yield('content')
            <!--End page content-->
        </div>
        <!--===================================================-->
        <!--END CONTENT CONTAINER-->

    </div>

    <!-- FOOTER -->
    <!--===================================================-->
    <footer id="footer">

        <!-- Visible when footer positions are fixed -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <div class="show-fixed pull-right">
            You have <a href="#" class="text-bold text-main"><span class="label label-danger">3</span> pending action.</a>
        </div>

        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <!-- Remove the class "show-fixed" and "hide-fixed" to make the content always appears. -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

        <p class="pad-lft">&#0169; CÔNG TY TNHH MTV VIỄN THÔNG QUỐC TẾ FPT</p>



    </footer>
    <!--===================================================-->
    <!-- END FOOTER -->


    <!-- SCROLL PAGE BUTTON -->
    <!--===================================================-->
    <button class="scroll-top btn">
        <i class="pci-chevron chevron-up"></i>
    </button>
    <!--===================================================-->



</div>
<!--===================================================-->
<!-- END OF CONTAINER -->

<!--jQuery [ REQUIRED ]-->
<script src="/nifty/js/jquery.min.js"></script>
<!--BootstrapJS [ RECOMMENDED ]-->
<script src="/nifty/js/bootstrap.min.js"></script>
<script src="{{ asset('/assets/plugins/moment/min/moment-with-locales.min.js') }}"></script>
<!--NiftyJS [ RECOMMENDED ]-->
<script src="/nifty/js/nifty.min.js"></script>
<script src="/nifty/plugins/pace/pace.min.js"></script>
<!--Select2 [ OPTIONAL ]-->
<script src="/nifty/plugins/select2/js/select2.min.js"></script>

{{--<script src="{{ asset('vendor/select2/select2.js') }}"></script>--}}

<!-- pnotify -->
<script src="{{ asset('/assets/plugins/pnotify/pnotify.custom.min.js') }}"></script>
<!--Switchery [ OPTIONAL ]-->
<script src="/nifty/plugins/switchery/switchery.min.js"></script>
<!-- bootstrap datepicker -->
<script src="{{ asset('/nifty/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js') }}"></script>
<script src="{{ asset('/nifty/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.vi.min.js') }}"></script>
<script src="{{ asset('/nifty/plugins/bootstrap-select/bootstrap-select.min.js') }}"></script>
<script src="/js/jquery.validate.min.js"></script>
<script src="/js/function.js?v={{$ver_js}}"></script>

<!-- page script -->
<script type="text/javascript">
    // Ajax calls should always have the CSRF token attached to them, otherwise they won't work
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
</script>

@yield('after_scripts')
</body>
</html>
