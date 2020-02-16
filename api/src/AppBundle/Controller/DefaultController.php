<?php

namespace AppBundle\Controller;

use AppBundle\Form\SearchType;
use AppBundle\Form\TimeType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends BaseController
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findAllSorted('BiH', $this->getBihNumberOfArticles(), $this->getBiHFilterDate());

        return $this->render('default/index.html.twig', [
            'items' => $items
        ]);
    }

    /**
     * @Route("/izvor/{source}", name="source")
     */
    public function sourceAction(Request $request, $source)
    {
        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findBySource($source, $this->getBihNumberOfArticles(), $this->getBiHFilterDate());

        return $this->render('default/index.html.twig', [
            'items' => $items,
            'date' => $this->getBiHFilterDate()
        ]);
    }

    public function searchFormAction()
    {
        $form = $this->createForm(SearchType::class,
            array(
                'action' => $this->generateUrl('pretraga'),
                'method' => 'POST'
            )
        );

        return $this->render('search/_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/pretraga", name="pretraga")
     * @Method({"GET", "POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function searchAction(Request $request)
    {
        $form = $this->createForm(SearchType::class,
            array(
                'action' => $this->generateUrl('pretraga'),
                'method' => 'POST',
            ));

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $data = $form->getData();
            $search = $data['title'];
            $request->getSession()->set('_pretraga', $search);

            $items = $this->get('doctrine_mongodb')
                ->getRepository('AppBundle:Article')
                ->findByTitleAndCategory($this->getBiHSearchQuery(), 'BiH', $this->getBihNumberOfArticles(), $this->getBiHFilterDate());

            return $this->render('default/search.html.twig', [
                'items' => $items,
                'search' => $search
            ]);
        }

        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findByTitleAndCategory($this->getBiHSearchQuery(), 'BiH', $this->getBihNumberOfArticles(), $this->getBiHFilterDate());

        return $this->render('default/search.html.twig', [
            'items' => $items,
            'search' => $this->getBiHSearchQuery()
        ]);
    }

    public function dateFormAction()
    {
        $form = $this->createForm(TimeType::class,
            array(
                'action' => $this->generateUrl('vremeplov'),
                'method' => 'POST',
            )
        );

        return $this->render('search/_date.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/postavke/{no}", name="bh_number_of_articles")
     */
    public function numberOfArticlesAction(Request $request, $no)
    {
        $request->getSession()->set('_bih_article_no', $no);

        $referer = $request->headers->get('referer');

        if (empty($referer)) {
            throw $this->createNotFoundException('referer_not_found');
        }

        return $this->redirect($referer);
    }

    /**
     * @Route("/vremeplov", name="vremeplov")
     * @Method({"POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function dateAction(Request $request)
    {
        $form = $this->createForm(TimeType::class)
            ->add('submit', SubmitType::class)
            ->add('reset', SubmitType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if($form->get('reset')->isClicked()) {
                $request->getSession()->set('_datum', null);
            } else {
                $data = $form->getData();
                $date = $data['date'];

                if ($date) {
                    $request->getSession()->set('_datum', $date);
                }
            }

        }

        $referer = $request->headers->get('referer');

        if (empty($referer)) {
            throw $this->createNotFoundException('referer_not_found');
        }

        return $this->redirect($referer);
    }
}
